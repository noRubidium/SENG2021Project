import React from "react"
import { connect } from "react-redux"

import Loading from "./Loading"

import { fetchRepos } from "../actions/githubActions"
import GithubResult from "./GithubResult"

import NoResult from "../pages/NoResult"

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

  updateNextPage(){
    this.props.dispatch({type: "NEXT_PAGE_REPO"})
    this.props.dispatch(fetchRepos(this.props.routeParams.search, this.props.github.currPage + 1))
  }

  updatePrevPage(){
    this.props.dispatch({type: "PREV_PAGE_REPO"})
    this.props.dispatch(fetchRepos(this.props.routeParams.search, this.props.github.currPage - 1))
  }

  render() {

    const { github } = this.props;
    const repos = github.repos.items;

    if ((!github) || github.fetching || (! repos) ) {
      return (
        <Loading />
      )
    }

    const { currPage } = github
    console.log(currPage)
    var repos_sorted = repos
    repos_sorted = repos_sorted.filter(repo => {return repo.language && repo.description})

    console.log(repos_sorted)

    if(!repos.length || !repos_sorted.length){
      // console.log(this.props)
      return (
        <NoResult term={this.props.routeParams.search} history={this.props.history}/>
      )
    }

    const mappedRepos = repos_sorted.map(repo => <li><GithubResult repo={repo}/></li>)

    return (
      <div>
          <h1>Search results for: '{this.props.routeParams.search}'</h1>
          <ul>{mappedRepos}</ul>
          {
            currPage > 1?
              <button class="btn btn-default" onClick={this.updatePrevPage.bind(this)}>&larr; Previous Page</button>
              :
              <button class="btn btn-default" disabled>&larr; Previous Page</button>
          }
          {
            currPage < 10?
              <button class="btn btn-default pull-right" onClick={this.updateNextPage.bind(this)}>Next Page &rarr;</button>
              :
              <button class="btn btn-default pull-right" disabled>Next Page &rarr;</button>
          }
      </div>
    );
  }
}
