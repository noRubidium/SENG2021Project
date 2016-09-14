import React from "react"
import YouTube from 'react-youtube'
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchVideos } from "../actions/videoSearchActions"

@connect((store) => {
  return {
    videoSearch: store.videoSearch,
  };
})
export default class VideoSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchVideos(this.props.routeParams.term))
  }

  fetchVideos() {
    this.props.dispatch(fetchVideos(this.props.routeParams.term))
  }

  render() {
    console.log(this);
    const { videoSearch } = this.props;
    const videos = videoSearch.videos.items;
    console.log("This is my object");
    console.log( videos);
    if (!videos) {
      return (
      <div>
        <button onClick={this.fetchVideos.bind(this)}>load videos</button>
        <Link to="video">video</Link>
      </div>)
    }

    const mappedVideos = videos.map(video => <li key={video.id.videoId}><Link to={"/video/display/"+video.id.videoId}>{video.snippet.title}</Link></li>)

    return <div>
      <h1>Rendering!</h1>
      <ul>{mappedVideos}</ul>
    </div>
  }
}
