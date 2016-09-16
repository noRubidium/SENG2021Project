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
      this.props.dispatch(fetchForums())
      this.props.dispatch(fetchVideos(this.props.routeParams.search))
  }

  render() {
    const forum_threads_json = this.props.forum.forum_threads
    const video_items_json = this.props.videoSearch.videos

    if ((forum_threads_json instanceof Array && !forum_threads_json.length)
        || (video_items_json instanceof Array && !video_items_json.length)) {
      return (<div>Loading</div>)
    }

    const forums = forum_threads_json.items;
    const videos = video_items_json.items;
    const mappedForums = forums.map(forum => <li><h3>{forum.title}</h3>{forum.excerpt}</li>)
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)

    const videoRows = []
    for(let i = 0; i < 9; i += 1){
      videoRows.push(<div class="row">{mappedVideos.slice(i, i+1)}</div>)
    }

    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h2>Tutorials</h2>
            {videoRows}
          </div>
          <div class="col-sm-6">
            <h2>Forums</h2>
            <ul>{mappedForums}</ul>
          </div>
        </div>
      </div>
    );
  }
}
