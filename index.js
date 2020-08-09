const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('dotenv').config()

require('./models/User')
require('./models/Blog')
require('./services/passport')
require('./services/cache')

// Routes
const setupAuthRoutes = require('./routes/authRoutes')
const setupBlogRoutes = require('./routes/blogRoutes')


app.use(helmet());
app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['cookie-key'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(
    `mongodb://${process.env.MONGO_DB}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-kkwue.mongodb.net:27017,cluster0-shard-00-01-kkwue.mongodb.net:27017,cluster0-shard-00-02-kkwue.mongodb.net:27017/${process.env.MONGO_DEFAULT_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true }
);


// Server Routes
setupAuthRoutes(app)
setupBlogRoutes(app);

app.listen(process.env.PORT, () => {
    console.log('Listening on port 5000');
});
