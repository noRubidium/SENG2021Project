import React from "react"
import { connect } from "react-redux"

import { login, logout } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user
  };
})

export default class Login extends React.Component {
  login(){
    const { lock } = this.props.user
    this.props.dispatch(login(lock))
  }
  logout(){
    console.log("HI!!!")
    this.props.dispatch(logout())
  }
  render(){
    const token = this.props.user.user.token
    console.log("HI!!!", token)
    if(token){
      // if(this.props.user.user.profile){
      //   console.log("MY FAULT")
      console.log("HI!!! THIS IS MY FAULT!", this.props.user)
        return (<a>
          <span style={{paddingRight:"10px"}}>Welcome {this.props.user.user.profile["nickname"]}</span>
          <a onClick={this.logout.bind(this)}>Logout</a>
        </a>);
      // }
    }
    return (
      <a onClick={this.login.bind(this)}>Login</a>
    )
  }
}
