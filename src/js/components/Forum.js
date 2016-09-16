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
    this.props.dispatch(fetchForums())
  }

  fetchForums() {
    this.props.dispatch(fetchForums())
  }

  render() {
    const { forum_threads_json } = this.props;

    if (forum_threads_json instanceof Array && !forum_threads_json.length) {
      return (<div>Loading</div>)
    }

    const forum_threads = forum_threads_json.items;
    const mappedForums = forum_threads.map(forum => <li><h3>{forum.title}</h3>{forum.excerpt}</li>)

    return <div>
        <h1>Hardcoded to search Java p.s. I don't know how to resolve the markdown issue</h1>
        <ul>{mappedForums}</ul>
    </div>
  }
}
