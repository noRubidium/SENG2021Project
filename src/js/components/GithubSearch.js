import React from "react"
import { connect } from "react-redux"

import { fetchRepos } from "../actions/githubActions"
import GithubResult from "./GithubResult"

@connect((store) => {
  return {
    github: store.github,
  };
})
export default class github extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchRepos(this.props.routeParams.search))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.search !== this.props.routeParams.search) {
      nextProps.dispatch(fetchRepos(nextProps.routeParams.search))
    }
  }

  render() {
    const { github } = this.props;
    const repos = github.repos.items;

    if (!repos) {
      return (
      <div>
        Loading
      </div>)
    }

    var repos_sorted = repos
    repos_sorted = repos_sorted.filter(repo => {return repo.language && repo.description && repo.forks > 100})
    const mappedRepos = repos_sorted.length? repos_sorted.map(repo => <li><GithubResult repo={repo}/></li>)
        : <li>No results. Try a different search term.</li>

    return (
      <div>
          <h1>Search results for: '{this.props.routeParams.search}'</h1>
          <ul>{mappedRepos}</ul>
      </div>
    );
  }
}
