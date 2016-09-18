import React from "react"

export default class NoResult extends React.Component {
  render() {
    return (
      <div>
        <h2>Sorry, there is no result for "{this.props.term}" here. Please go back and try a different searchTerm.</h2>
        <button class="btn btn-default" onClick={this.props.history.goBack.bind(this)}>click here to go back</button>
      </div>
    )
  }
}
