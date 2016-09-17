import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchForums } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import VideoResult from "./VideoResult"

@connect((store) => {
  return {
    forum: store.forum,
    videoSearch: store.videoSearch,
  };
})
export default class AllSearch extends React.Component {
  componentWillMount() {
      this.props.dispatch(fetchForums(this.props.routeParams.search))
      this.props.dispatch(fetchVideos(this.props.routeParams.search))
  }

  render() {
    const forum_threads_json = this.props.forum.forum_threads
    const video_items_json = this.props.videoSearch.videos

    if ((forum_threads_json instanceof Array && !forum_threads_json.length)
        || (video_items_json instanceof Array && !video_items_json.length)) {
      return (<div>Loading</div>)
    }

    console.log("Logging from AllSearch")
    console.log(forum_threads_json)
    console.log(video_items_json)

    const forums = forum_threads_json.items;
    const videos = video_items_json.items;

    var ReactMarkdown = require('react-markdown');
    const mappedForums = forums.map(forum => <li><h3><a target="_blank" href={forum.link}>
                                             <ReactMarkdown source={forum.title} /></a></h3><ReactMarkdown source={forum.body} /></li>)
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)

    const videoRows = []
    for(let i = 0; i < 9; i += 1){
      videoRows.push(<div class="row">{mappedVideos.slice(i, i+1)}</div>)
    }

    return (
      <div class="container">
        <div class="row center-text">
          <h2>Displaying search results for '{this.props.routeParams.search}'</h2>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h3>Tutorials</h3>
            {videoRows}
          </div>
          <div class="col-sm-6">
            <h3>Forums</h3>
            <ul>{mappedForums}</ul>
          </div>
        </div>
      </div>
    );
  }
}
