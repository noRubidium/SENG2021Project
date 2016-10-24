import React from "react"
import { Link } from "react-router"

import { connect } from "react-redux"
import { addRepoFav } from "../actions/userActions"
import { removeRepoFav } from "../actions/userActions"

import { addTodoList } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class GithubResult extends React.Component {

  componentWillMount() {
    this.props.dispatch(addTodoList(this.props.repo))
    console.log(this.props.user.board)

  }

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

    const icon = (this.props.user.user.repoFavs).indexOf(this.props.repo) >= 0 ?
                "glyphicon glyphicon-heart pull-right": "glyphicon glyphicon-heart-empty pull-right"
    const favourite = <a href="#" onClick={this.favourite.bind(this)}><span class={icon}></span></a>

    return (
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-10 title-links" style={{wordWrap: "break-word"}}>
              <h3>
                <Link to={"/github/display/"+repo.id} >
                  {repo.full_name}
                </Link>
              </h3>
            </div>
            <div class="col-md-2">
              <h3>{favourite}</h3>
            </div>
          </div>
          <div class="row col-md-12 github-result">
            <h5><span class="octicon octicon-star"></span>{repo.stargazers_count}
            &emsp;<span class="octicon octicon-repo-forked"></span> {repo.forks} </h5>
            <h5>Written in <i>{repo.language}</i></h5>
            <h5>{repo.description}</h5>
            <span class="badge pull-right">repositories</span>
          </div>
        </div>
      </div>
    )
  }
}
