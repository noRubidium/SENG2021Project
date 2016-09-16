import React from "react"
import { connect } from "react-redux"

import { fetchRepos } from "../actions/githubSearchActions"
import GithubResult from "./GithubResult"

@connect((store) => {
  return {
    githubSearch: store.githubSearch,
  };
})
export default class githubSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchRepos(this.props.routeParams.term))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.term !== this.props.routeParams.term) {
      nextProps.dispatch(fetchRepos(nextProps.routeParams.term))
    }
  }

  render() {
    const { githubSearch } = this.props;
    console.log(this.props)
    const repos = githubSearch.repos.items;

    if (!repos) {
      return (
      <div>
      </div>)
    }

    const mappedRepos = repos.map(repo => <GithubResult repo={repo}/>)

    const rows = []
    for(let i = 0; i < 9; i+= 3){
      rows.push(<div class="row">{mappedRepos.slice(i, i+3)}</div>)
    }
    return <div>
      <h1>Github results for "{this.props.routeParams.term}"</h1>
      {rows}
      {/*<div class="row">{mappedVideos}</div>*/}
    </div>
  }
}
