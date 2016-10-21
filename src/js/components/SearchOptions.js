import React from "react"
import { Link } from "react-router"

export default class SearchOptions extends React.Component {
  render() {

    const { search } = this.props
    const { active } = this.props

    const allClass = active === "all"? "btn btn-primary active": "btn btn-primary"
    const videoClass = active === "tutorial"? "btn btn-primary active": "btn btn-primary"
    const forumClass = active === "forum"? "btn btn-primary active": "btn btn-primary"
    const githubClass = active === "repo"? "btn btn-primary active": "btn btn-primary"

    const allLink = '/all/' + search
    const videoLink = '/video/' + search
    const forumLink = '/forum/' + search
    const githubLink = '/github/' + search

    console.log(this.props)
    console.log("jeteeee")

    return (
      <div class="container-fluid">
        <div class="search-result-banner text-center">
  	      <h4> Search Result for: `{search}` </h4>
        </div>
        <br/>
        <br/>
        <div class="search-options text-center">
  	      <Link to={allLink}><button class={allClass}>All</button></Link>
  	      <span> | </span>
          <Link to={videoLink}><button class={videoClass}>Tutorials</button></Link>
          <span> | </span>
          <Link to={forumLink}><button class={forumClass}>Forums</button></Link>
          <span> | </span>
          <Link to={githubLink}><button class={githubClass}>Repositories</button></Link>
      </div>
    </div>
    )
  }
}
