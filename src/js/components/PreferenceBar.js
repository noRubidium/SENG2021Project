import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { updatePreferences } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class PreferenceBar extends React.Component {
  constructor() {
    super()
    this.state = {
      preferencesRaw:"",
    }
  }

  handleChange(e) {
    this.setState({preferencesRaw: e.target.value})
  }

  handleSubmit(e) {
      e.preventDefault() // Crucial to stop page refreshing
      var preferences = this.state.preferencesRaw
      preferences = preferences.replace(",","|")
      this.props.dispatch(updatePreferences(preferences))
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div class="col-md-11">
            <input
              type="text"
              class="form-control"
              placeholder={"e.g. \"react, redux, competitive programming\""}
              onChange={this.handleChange.bind(this)}
            />
          </div>

          <div class="col-md-1">
            <button type="button" class="btn btn-default">
              <span class="glyphicon glyphicon-ok"></span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
