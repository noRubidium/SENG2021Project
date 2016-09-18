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
    // console.log("This is from video object: ", video);
    // const winWidth = window.innerWidth;
    const winWidth = document.getElementsByClassName("container")[1]?
      document.getElementsByClassName("container")[1].offsetWidth/2:
      window.innerWidth * 0.4;
    // if()
    const opts = {
          height: winWidth * 390 / 640,
          width: winWidth,
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };
    console.log("winwidth:",winWidth);
    return <div class="row">
      <div style={
          {
            marginLeft:(winWidth / 2)  + "px",
            width: winWidth  + "px",
          }
        }>
        <h1
          style={
            {textAlign:"center"}
          }
          >{video.video? video.video.title : "Loading..."}</h1>
        <YouTube
          videoId={this.props.routeParams.videoId}
          opts={opts}
          onReady={this._onReady}
          />
        {
          video.video?
          (<div>
            <div>
              <pre>{ video.video.localized.description }</pre>
            </div>
          </div>):
          <h1> Loading... </h1>
        }
      </div>
    </div>
  }
}
