import React from "react"
import YouTube from 'react-youtube';
import { connect } from "react-redux"

import { fetchVideo } from "../actions/videoSearchActions"
import { fetchRelatedVideos } from "../actions/videoSearchActions"
import VideoResult from "./VideoResult"
import NoResult from "../pages/NoResult"
import Loading from "./Loading"

@connect((store) => {
  return {
    video: store.video,
  };
})

export default class Video extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchVideo(this.props.routeParams.videoId))
    this.props.dispatch(fetchRelatedVideos(this.props.routeParams.videoId))
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const { video } = this.props
    const { videoId } = this.props.routeParams
    const linkToVideo = "https://www.youtube.com/watch?v=" + videoId

    console.log("This is from video object: ", video);
    // const winWidth = window.innerWidth;
    const winWidth = document.getElementsByClassName("container")[1]?
      document.getElementsByClassName("container")[1].offsetWidth/2:
      window.innerWidth * 0.4;

    const sizeFactor = 1.5; // control size of the player
    const opts = {
          height: winWidth * 390 / 640 * sizeFactor,
          width: winWidth * sizeFactor,
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };
    // console.log("winwidth:",winWidth);
    const pTag = video.video? video.video.localized.description.split(/\n/):[]
    const description = pTag.map(ptag => <p> {ptag}</p>)

    const relatedItems = video.related ? video.related.items: '';
    const mappedRelated = relatedItems ? relatedItems.map(video => <div class="col-md-3" key={video.id.videoId} style={{marginBottom: "20px"}}><VideoResult hideDescription="yes" titleSize="h5" video={video}></VideoResult></div>) : ''

    return (
    <div class="container title-links">
      {
        video.video?
        <h3><a target="_blank" href = {linkToVideo}>{video.video.title}</a></h3>:
        <Loading />
      }
      <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
      <hr />
      <h3>Related Videos</h3>
      {mappedRelated}

      <hr />
      <h3>Description</h3>
      {video.video?(<div><div><p>{description}</p></div></div>) :<h1> Loading... </h1>}
    </div>);
  }
}
