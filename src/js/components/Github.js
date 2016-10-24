import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"

import GithubRepo from "./GithubRepo"
import { fetchRepoContent } from "../actions/githubActions"
import { fetchReadme } from "../actions/githubActions"
import { addRepoFav } from "../actions/userActions"
import { removeRepoFav } from "../actions/userActions"

import { Loading } from "./Loading"

@connect((store) => {
  return {
    user: store.user,
    github: store.github,
  };
})

export default class Github extends React.Component {
  componentWillMount() {
    const repos = this.props.github.repos.items
    const { repoId } = this.props.routeParams
    if (repos instanceof Array && repos.length) {
      const repo = repos.filter(repo => { return repo.id == repoId })[0]
      this.props.dispatch(fetchRepoContent(repo.full_name))
      this.props.dispatch(fetchReadme(repo.full_name))
    }
  }
  favourite(e) {
    const repos = this.props.github.repos.items
    const { repoId } = this.props.routeParams
    const repo = repos.filter(repo => { return repo.id == repoId })[0]
    console.log("jete",repo)
    e.preventDefault()
    if ((this.props.user.user.repoFavs).indexOf(repo) >= 0) {
      console.log("remove",repo)
      this.props.dispatch(removeRepoFav(repo))
    } else {
      console.log("add",repo)
      this.props.dispatch(addRepoFav(repo))
    }
  }
  render() {
    const { github } = this.props
    const repos = github.repos.items

    if (repos instanceof Array && !repos.length) {
      return (<div>Illegal access (must go through a link)</div>)
    }

    const { repoId } = this.props.routeParams
    const repo = repos.filter(repo => { return repo.id == repoId })[0]

    const icon = (this.props.user.user.repoFavs).indexOf(repo) >= 0 ?
                "glyphicon glyphicon-heart pull-right": "glyphicon glyphicon-heart-empty pull-right"
    const favourite = <a href="#" onClick={this.favourite.bind(this)}><span class={icon}></span></a>

    // get the sha of the latest commit
    if(!github.content){
      // can't put Loading somehow
      return (
        <div>
            <center><img src="loading.gif" style={{verticalAlign: "top", width: "120px", marginTop: "50px", marginBottom: "10px"}}/></center>
            <div class="row">
              <center><h3 class="loading" style={{color: "#446CB3"}}><strong>Squeezing our sauces</strong></h3></center>
            </div>
        </div>
        )
    }

    const latest_commit_sha = github.content[0].sha

    console.log("This is github:",github)
    return (
      <div class="container title-links">
          <h3><a target="_blank" href = {repo.html_url}>{repo.full_name}</a>{favourite}</h3>
          <div class="col-md-9">
            <ReactMarkdown source={github.readme}/>
          </div>
          <div class="col-md-3">
            <h3>Source Tree</h3>
            <GithubRepo sha={latest_commit_sha} name={repo.full_name}/>
          </div>
      </div>
    );
  }
}
