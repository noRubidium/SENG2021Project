import React from "react"
import { connect } from "react-redux"

// @connect((store) => {
//   return {
//     user: store.user
//   };
// })

export default class NotFound extends React.Component {
  render() {
    // const { lock } = this.props.user
    // console.log(lock, this.props.user)
    // localStorage.setItem("hash", window.location.hash)
    // const hash = lock.parseHash(window.location.hash)
    // if(hash && hash.id_token && ! localStorage.getItem("id_token")){
    //   localStorage.setItem("id_token", hash.id_token)
    //   this.props.dispatch({type:"LOGGEDIN", payload:hash.id_token})
    // }
    return (
      <div>
        <h1>Sorry, there is nothing here. Please try go to another page.</h1>
        <button class="btn btn-default" onClick={this.props.history.goBack.bind(this)}>click here to go back</button>
      </div>
    )
  }
}
