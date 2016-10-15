import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"
import { fetchForums } from "../actions/forumActions"

import NoResult from "../pages/NoResult"
import ForumResult from "./ForumResult"
import PaginationButton from "./Pagination"

@connect((store) => {
  return {
    forum: store.forum
  }
})

export default class ForumSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.search !== this.props.routeParams.search) {
      nextProps.dispatch(fetchForums(nextProps.routeParams.search))
    }
  }

  updateNextPage(){
    this.props.dispatch({type: "NEXT_PAGE_FORUM"})
    this.props.dispatch(fetchForums(this.props.routeParams.search, this.props.forum.currPage + 1))
  }

  updatePrevPage(){
    this.props.dispatch({type: "PREV_PAGE_FORUM"})
    this.props.dispatch(fetchForums(this.props.routeParams.search, this.props.forum.currPage - 1))
  }

  render() {
    const { forum } = this.props;

    if (!forum || forum.fetching || !forum.fetched) {
      return <Loading />
    }

    const { currPage } = forum
    const threads = forum.forum_threads.items
    const search = this.props.routeParams.search

    if (!threads || !threads.length){
      return <NoResult term={search} history={this.props.history}/>
    }

    const mappedForums = threads.map(forum => <ForumResult key={forum.question_id} forum={forum}/>)

    return (
      <div className="forumBox">
        <h1>Search results for: '{search}'</h1>
        <ul>{mappedForums}</ul>
        <PaginationButton currPage={currPage} prevPage={this.updatePrevPage.bind(this)}
          nextPage={this.updateNextPage.bind(this)}/>
      </div>
    )
  }
}
