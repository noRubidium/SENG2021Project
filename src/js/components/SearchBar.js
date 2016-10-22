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
    const { formClass } = this.props;

    return (
      <form class={formClass} role="search">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            onChange={e => this.setState({term: e.target.value})}>
          </input>
          <span class="input-group-btn">
            <Link to={this.getLink()}>
              <button type="submit" class={this.state.term? "btn btn-default":"btn btn-default disabled"}>
                <i class="glyphicon glyphicon-search"></i>
              </button>
            </Link>
          </span>
        </div>
      </form>
    )
  }
}
