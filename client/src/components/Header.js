import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContents() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <ul>
            <li>
              <a href={'/auth/google'}>Login With Google</a>
            </li>
            <li>
              <a href={'/auth/github'}>Login With Github</a>
            </li>
          </ul>
        )
      default:
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a href={'/auth/logout'}>Logout</a>
          </li>
        ]
    }
  }

  render() {
    const { auth } = this.props
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            to={auth ? '/blogs' : '/'}
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            oAuth2
          </Link>
          <ul className="right">{this.renderContents()}</ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)
