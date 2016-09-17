import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

export default class GithubResult extends React.Component {
  render() {
    const { repo } = this.props

    return (
      <div>
        <Link to={"/github/display/"+repo.full_name} class="thumbnails">
          <h3>{repo.full_name}</h3>
        </Link>

        <h5>language: {repo.language}</h5>
        <h5>description: {repo.description}</h5>
      </div>
    )
  }
}
