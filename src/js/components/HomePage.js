import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'
import SearchBar from "./SearchBar"



export default class HomePage extends React.Component {
  render(){

    const types = ["all", "video", "forum", "github"]
    const options = types.map((item) => {
      return (<option value={item} >{item}</option>);
    })
    const searchBarStyle = {
      marginTop: "60px"
    };
    const searchBarClass = {

    }

    return (
      <div class="container">

        <div class="row">
          <div class="col-sm-8 col-sm-offset-2 text-center">
            <h1>Welcome</h1>
            <h4>Search for any programming related topic</h4>
          </div>
        </div>

        <SearchBar searchBarStyle = {searchBarStyle} divStyle="col-sm-6 col-sm-offset-3 text-center" />
      </div>

    )
  }
}
