import React from "react"
import { Link } from "react-router"
import { browserHistory } from 'react-router'

export default class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      term: "",
      getLink: e => "all/"+ this.state.term
    }
  }

  getLink() {
     return "all/"+ this.state.term;
  }

  render(){
    return (
      <div class="input-group search-bar-homepage text-center">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          onChange={e => this.setState({term: e.target.value})}>
        </input>
        <span class="input-group-btn">
          <Link to={this.getLink()}>
            <button type="submit" class="btn btn-default" disabled={this.state.term? "":"disabled"}>
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </Link>
        </span>
      </div>
    )
  }
}
