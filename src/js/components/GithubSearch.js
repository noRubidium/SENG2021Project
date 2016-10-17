import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"
import { fetchRepos } from "../actions/githubActions"

import NoResult from "../pages/NoResult"
import GithubResult from "./GithubResult"
import PaginationButton from "./Pagination"

@connect((store) => {
  return {
    github: store.github
  }
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
    const { github } = this.props

    if ((!github) || github.fetching || !github.fetched) {
      return <Loading />
    }

    const { currPage } = github
    const repos = github.repos.items
    const search = this.props.routeParams.search

    const filtered_repos = repos.filter(repo => {return repo.language && repo.description})

    if (!repos || !repos.length || !filtered_repos.length){
      return <NoResult term={search} history={this.props.history}/>
    }

    const mappedRepos = filtered_repos.map(repo => <li><GithubResult repo={repo} key={repo.id}/></li>)

    return (
      <div>
        <h1>Search results for: '{search}'</h1>
        <ul>{mappedRepos}</ul>
        <PaginationButton currPage={currPage} prevPage={this.updatePrevPage.bind(this)}
          nextPage={this.updateNextPage.bind(this)}/>
      </div>
    );
  }
}
