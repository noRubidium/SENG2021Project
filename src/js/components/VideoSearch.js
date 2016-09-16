import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchVideos } from "../actions/videoSearchActions"
import VideoResult from "./VideoResult"

@connect((store) => {
  return {
    videoSearch: store.videoSearch,
  };
})
export default class VideoSearch extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchVideos(this.props.routeParams.term))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.term !== this.props.routeParams.term) {
      nextProps.dispatch(fetchVideos(nextProps.routeParams.term))
    }
  }
  
  fetchVideos() {
    this.props.dispatch(fetchVideos(this.props.routeParams.term))
  }

  render() {
    const { videoSearch } = this.props;
    const videos = videoSearch.videos.items;
    if (!videos) {
      return (
      <div>
        <button onClick={this.fetchVideos.bind(this)}>load videos</button>
        <Link to="video">video</Link>
      </div>)
    }

    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)

    const rows = []
    for(let i = 0; i < 9; i+= 3){
      rows.push(<div class="row">{mappedVideos.slice(i, i+3)}</div>)
    }
    return <div>
      <h1>Rendering!</h1>
      {rows}
      {/*<div class="row">{mappedVideos}</div>*/}
    </div>
  }
}
