import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { fetchForums } from "../actions/forumActions"

@connect((store) => {
  return {
    forum_threads_json: store.forum.forum_threads,
  };
})
export default class Forum extends React.Component {
  componentWillMount() {
    console.log(this.props);
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  fetchForums() {
    this.props.dispatch(fetchForums(this.props.routeParams.search))
  }

  render() {
    const { forum_threads_json } = this.props;

    if (forum_threads_json instanceof Array && !forum_threads_json.length) {
      return (<div>Loading</div>)
    }

    var ReactMarkdown = require('react-markdown');
    const forum_threads = forum_threads_json.items;
    const mappedForums = forum_threads.map(forum => <li><h3><a target="_blank" href={forum.link}>
          <ReactMarkdown source={forum.title} /></a></h3><ReactMarkdown source={forum.body} /></li>)

    return <div>
        <h1>Search results for: '{this.props.routeParams.search}'</h1>
        <ul>{mappedForums}</ul>
    </div>
  }
}
