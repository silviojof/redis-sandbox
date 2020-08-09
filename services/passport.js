const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new GoogleStrategy({
  callbackURL: '/auth/google/callback',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  proxy: true
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ profileId: profile.id })
      if (existingUser) return done(null, existingUser)
      const user = await new User({
        profileId: profile.id,
        displayName: profile.displayName
      }).save()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  }
));

passport.use(new GitHubStrategy({
  callbackURL: 'http://localhost:3000/auth/github/callback',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
},

  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ profileId: profile.id })
      if (existingUser) return done(null, existingUser)
      const user = await new User({
        profileId: profile.id,
        displayName: profile.displayName
      }).save()
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  }
));

