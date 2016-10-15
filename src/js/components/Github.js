import React from "react"
import { connect } from "react-redux"

import GithubRepo from "./GithubRepo"
import { fetchRepoContent } from "../actions/githubActions"

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
    }
  }

  render() {
    const { github } = this.props
    const repos = github.repos.items

    if (!repos) {
      return (
        <div>Cannot access</div>
      )
    }

    const { repoId } = this.props.routeParams
    const repo = repos.filter(repo => { return repo.id == repoId })[0]


    // get the sha of the latest commit
    if(!github.content){
      return <h1>Loading...</h1>
    }

    const latest_commit_sha = github.content[0].sha

    console.log("This is github:",github)

    var ReactMarkdown = require('react-markdown')
    return (
      <div>
          <GithubRepo sha={latest_commit_sha} name={repo.full_name}/>

      </div>
    );
  }
}

/*
<a target="_blank" href = {repo.html_url}><h1>{repo.full_name}</h1></a>
{<pre>{github.content}</pre>}
<ReactMarkdown source={atob(github.content.content)} />
*/
