import React from "react"
import { connect } from "react-redux"

import { login, logout } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Login extends React.Component {
  login(e){
    const { lock } = this.props.user
    e.preventDefault()
    this.props.dispatch(login(lock))
  }
  logout(e){
    e.preventDefault()
    this.props.dispatch(logout())
    this.props.history.push("/")
  }
  render(){
    const { token } = this.props.user.user
    if (token) {
        return (
          <ul class="nav navbar-nav navbar-right">
            <li><p class="navbar-text">Welcome, {this.props.user.user.profile["nickname"]}</p></li>
            <li><a href='#' onClick={this.logout.bind(this)} class="navbar-links">LOGOUT</a></li>
          </ul>
        );
    }
    return (
      <ul class="nav navbar-nav navbar-right">
        <li><a href='#' onClick={this.login.bind(this)} class="navbar-links">LOGIN</a></li>
      </ul>
    )
  }
}
