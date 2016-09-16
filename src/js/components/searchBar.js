import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'




export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:"",
      type: "all",
      getLink: e => this.state.type + "/"+ this.state.term,
    }
  }

  render(){

    const types = ["all", "video", "forum", "github"]
    const options = types.map((item) => {
      return (<option value={item} >{item}</option>);
    })
    const searchBarStyle = {
      marginTop: "60px"
    };

    return (
      <div class="container">

        <div class="row">
          <div class="col-sm-8 col-sm-offset-2 text-center">
            <h1>Welcome</h1>
            <h4>Search for any programming related topic</h4>
          </div>
        </div>

        <div class="row" style={searchBarStyle}>
          <div class="col-sm-6 col-sm-offset-3 text-center">
            <div class="col-sm-4">
              <select class="form-control" onChange={e => this.setState({type: e.target.value})}>
                  {options}
              </select>
            </div>
            <div class="col-sm-7">
              <input type="text" class="form-control" placeholder="Search" onChange={e => this.setState({term: e.target.value})}></input>
            </div>
            <div class="col-sm-1">
              <Link to={this.state.getLink()}>
                <button type="submit" class="btn btn-default">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

    )
  }
}
