import React from "react"
import { Link } from "react-router"

import { connect } from "react-redux"
import { addRepoFav } from "../actions/userActions"
import { removeRepoFav } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class GithubResult extends React.Component {

  favourite(e) {
    e.preventDefault()
    if ((this.props.user.user.repoFavs).indexOf(this.props.repo) >= 0) {
      this.props.dispatch(removeRepoFav(this.props.repo))
    } else {
      this.props.dispatch(addRepoFav(this.props.repo))
    }
  }

  render() {
    const { repo } = this.props

    const favourite = (this.props.user.user.repoFavs).indexOf(this.props.repo) >= 0 ?
            <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart pull-right"></span></a>
            : <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart-empty pull-right"></span></a>


    return (
      <div>
        <h3>
          <Link to={"/github/display/"+repo.id} class="thumbnails">
            {repo.full_name}
          </Link>
          {favourite}
        </h3>
        <h5><span class="octicon octicon-star"></span>{repo.stargazers_count}
        &emsp;<span class="octicon octicon-repo-forked"></span> {repo.forks} </h5>
        <h5>Written in <i>{repo.language}</i></h5>
        <h5>{repo.description}</h5>
      </div>
    )
  }
}
