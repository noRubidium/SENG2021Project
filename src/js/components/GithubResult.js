import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

export default class GithubResult extends React.Component {
  render() {
    const { repo } = this.props

    return (
      <div class="col-sm-6 col-md-4">
        <Link to={"/github/display/"+repo.id} class="thumbnails">
            <img src={repo.owner.avatar_url} width="100" height="100" />
        </Link>

        <div class="caption">
            <h3>{repo.full_name}</h3>
        </div>
      </div>
    )
  }
}
