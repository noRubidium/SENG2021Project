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
          <div class="text-center">
            <h1>Welcome</h1>
            <h4>Search for any programming related topic</h4>
          </div>
        </div>

        <div class="control-group">&nbsp;</div> {/*spacer*/}
        <SearchBar searchBarStyle = {searchBarStyle} divStyle="col-md-8 col-md-offset-2 text-center" />
        <div class="control-group">&nbsp;</div> {/*spacer*/}
        <div class="control-group">&nbsp;</div> {/*spacer*/}

        <div class="row">
          <div class="text-center">
            <h4>Not sure where to begin? Select a topic.</h4>
            <div class="control-group">&nbsp;</div> {/*spacer*/}
            <Link to='/video/programming'><button class="btn btn-primary" style={{marginLeft:"5px"}}>Learn Technologies</button></Link>
            <Link to='/forum/programming'><button class="btn btn-primary" style={{marginLeft:"5px"}}>Discuss Topics</button></Link>
            <Link to='/github/programming'><button class="btn btn-primary" style={{marginLeft:"5px"}}>Explore Code</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
