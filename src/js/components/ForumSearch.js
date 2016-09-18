import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchForums } from "../actions/forumActions"

import NoResult from "../pages/NoResult"

import ReactMarkdown from "react-markdown";

@connect((store) => {
  return {
    forum_threads_json: store.forum.forum_threads,
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
    const { forum_threads_json } = this.props;

    if ((!forum_threads_json) || forum_threads_json.fetching) {
      return (<div>Loading...</div>)
    }
    console.log(forum_threads_json)
    if( (! forum_threads_json.items) || ! forum_threads_json.items.length){
      return <NoResult term={this.props.routeParams.term} history={this.props.history}/>
    }

    const forum_threads = forum_threads_json.items;
    const mappedForums = forum_threads.length ? forum_threads.map(forum => <li key={forum.question_id}><h3><Link to={"/forum/display/"+forum.question_id}>
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
