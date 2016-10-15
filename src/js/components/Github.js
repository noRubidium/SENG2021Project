import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"

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
    console.log("This is github:",github)
    if(!github.content){
      return <h1>Loading...</h1>
    }
    return (
      <div>
          <a target="_blank" href = {repo.html_url}><h1>{repo.full_name}</h1></a>
          {/*<pre>{github.content}</pre>*/}
          <ReactMarkdown source={github.content} />
      </div>
    );
  }
}
