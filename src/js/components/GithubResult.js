import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

export default class GithubResult extends React.Component {
  render() {
    const { repo } = this.props

    return (
      <div>
        <Link to={"/github/display/"+repo.id} class="thumbnails">
          <h3>{repo.full_name}</h3>
        </Link>
        <h5><span class="octicon octicon-star"></span>{repo.stargazers_count}
        &emsp;<span class="octicon octicon-repo-forked"></span> {repo.forks} </h5>
        <h5>Written in <i>{repo.language}</i></h5>
        <h5>{repo.description}</h5>
      </div>
    )
  }
}
