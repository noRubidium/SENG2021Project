import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchForums } from "../actions/forumActions"

import NoResult from "../pages/NoResult"

import ReactMarkdown from "react-markdown";

@connect((store) => {
  return {
    forum: store.forum,
  };
})
export default class ForumSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  fetchForums() {
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  render() {
    const { forum } = this.props;

    if ((!forum) || forum.fetching || ! forum.fetched) {
      return (<div>Loading...</div>)
    }
    const { forum_threads } = forum;
    console.log(forum_threads)
    if( (! forum_threads.items) || ! forum_threads.items.length){
      return <NoResult term={this.props.routeParams.term} history={this.props.history}/>
    }

    const forum_threads_items = forum_threads.items;
    const mappedForums = forum_threads_items.length ? forum_threads_items.map(forum => <li key={forum.question_id}><h3><Link to={"/forum/display/"+forum.question_id}>
        <ReactMarkdown source={forum.title} /></Link></h3>
        <ReactMarkdown source={forum.body} /></li>)
        : <li>No results. Try a different search term.</li>

    return (
      <div className="forumBox">
          <h1>Search results for: '{this.props.routeParams.search}'</h1>
          <ul>{mappedForums}</ul>
      </div>
    );
  }
}
