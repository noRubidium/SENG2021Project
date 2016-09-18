import React from "react"

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Sorry, there is nothing here. Please try go to another page.</h1>
        <button class="btn btn-default" onClick={this.props.history.goBack.bind(this)}>click here to go back</button>
      </div>
    )
  }
}
