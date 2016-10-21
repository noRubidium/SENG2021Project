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
     return this.state.term? "all/"+ this.state.term: "";
  }

  render(){
    return (
      <form class="row" role="search">
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
                <i class="glyphicon glyphicon-search"></i>
              </button>
            </Link>
          </span>
        </div>
      </form>
    )
  }
}
