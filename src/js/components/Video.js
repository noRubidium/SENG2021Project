import React from "react"
import YouTube from 'react-youtube';
import { connect } from "react-redux"

import { fetchVideo } from "../actions/videoSearchActions"

@connect((store) => {
  return {
    video: store.video,
  };
})

export default class Video extends React.Component {

  componentWillMount() {
    const { video } = this.props;
    this.props.dispatch(fetchVideo(this.props.routeParams.videoId))
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const { video } = this.props;
    console.log("This is from video object: ", video);
    const opts = {
          height: '390',
          width: '640',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };
    return <div>
      <h1>{video.video? video.video.title : "Loading..."}</h1>
        <YouTube
          videoId={this.props.routeParams.videoId}
          opts={opts}
          onReady={this._onReady}
        />
      {
        video.video?
        <h1><pre>{ video.video.localized.description }</pre></h1>:
        <h1> Loading... </h1>
      }
    </div>
  }
}
