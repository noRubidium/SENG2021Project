import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"
import { fetchForums } from "../actions/forumActions"

import NoResult from "../pages/NoResult"
import ForumItem from "./ForumItem"


@connect((store) => {
  return {
    forum: store.forum,
  };
})
export default class ForumSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(this.props.forum.currPage)
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
    const { currPage } = forum;

    if ((!forum) || forum.fetching || ! forum.fetched) {
      return (
        <Loading />
      )
    }
    const { forum_threads } = forum;
    if( (! forum_threads.items) || ! forum_threads.items.length){
      return <NoResult term={this.props.routeParams.search} history={this.props.history}/>
    }
    const forum_threads_items = forum_threads.items;
    const mappedForums = forum_threads_items.length ?
      forum_threads_items.map(forum => <ForumItem key={forum.question_id} forum={forum}/>)
      : <li>No results. Try a different search term.</li>

    return (
      <div className="forumBox">
          <h1>Search results for: '{this.props.routeParams.search}'</h1>
          <ul>{mappedForums}</ul>
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
