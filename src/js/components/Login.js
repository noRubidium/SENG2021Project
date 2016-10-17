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
    console.log("HI!!!")
    e.preventDefault()
    this.props.dispatch(logout())
  }
  render(){
    const token = this.props.user.user.token
    console.log("HI!!!", token)
    if(token){
      // if(this.props.user.user.profile){
      //   console.log("MY FAULT")
      console.log("HI!!! THIS IS MY FAULT!", this.props.user)
        return (<ul class="nav navbar-nav navbar-right">
          <li style={{marginTop:"20px"}}><span style={{paddingRight:"10px", color:"white"}}>Welcome {this.props.user.user.profile["nickname"]}</span></li>
          <li><a href='#' onClick={this.logout.bind(this)}>Logout</a></li>
        </ul>);
      // }
    }
    return (
      <ul class="nav navbar-nav navbar-right"><li><a href='#' onClick={this.login.bind(this)}>Login</a></li></ul>
    )
  }
}
