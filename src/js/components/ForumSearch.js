import React from "react"
import ReactPaginate from 'react-paginate';
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchForums } from "../actions/forumActions"

export class ForumList extends React.Component {
render() {
  var ReactMarkdown = require('react-markdown');
  let threads = this.props.data.map(function(forum, index) {
    return (
      <div key={index}>
      <li><h3><Link to={"/forum/display/"+forum.question_id}>
      <ReactMarkdown source={forum.title} /></Link></h3>
      <ReactMarkdown source={forum.body} /></li>
      </div>
    );
  });

  return (
    <div className="forumList">
      <ul>
        {threads}
      </ul>
    </div>
  );
}
};

@connect((store) => {
  return {
    forum_threads_json: store.forum.forum_threads,
  };
})
export default class ForumSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    }
  }

  componentWillMount() {
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
    const mappedForums = forum_threads.length ? forum_threads.map(forum => <li><h3><Link to={"/forum/display/"+forum.question_id}>
        <ReactMarkdown source={forum.title} /></Link></h3>
        <ReactMarkdown source={forum.body} /></li>)
        : <li>No results. Try a different search term.</li>

    return (
      <div className="forumBox">
          <h1>Search results for: '{this.props.routeParams.search}'</h1>
          <ForumList data={forum_threads}/>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageNum={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
           />
      </div>
    );
  }
}
