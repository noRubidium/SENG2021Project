import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"

import GithubRepo from "./GithubRepo"
import { fetchRepoContent } from "../actions/githubActions"
import { fetchReadme } from "../actions/githubActions"

@connect((store) => {
  return {
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

  render() {
    const { github } = this.props
    const repos = github.repos.items

    if (repos instanceof Array && !repos.length) {
      return (<div>Illegal access (must go through a link)</div>)
    }

    const { repoId } = this.props.routeParams
    const repo = repos.filter(repo => { return repo.id == repoId })[0]

//<<<<<<< HEAD

    // get the sha of the latest commit
    if(!github.content){
      return <h1>Loading...</h1>
    }

    const latest_commit_sha = github.content[0].sha

    console.log("This is github:",github)
    var ReactMarkdown = require('react-markdown')
    return (
      <div class="container title-links">
          <a target="_blank" href = {repo.html_url}><h1>{repo.full_name}</h1></a>
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
