import React from "react"
import YouTube from 'react-youtube';
import { connect } from "react-redux"

import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"

export default class Video extends React.Component {


  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {

    const opts = {
          height: '390',
          width: '640',
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
          }
        };
    return <div>
      <h1>This is a video</h1>
        <YouTube
          videoId={this.props.routeParams.videoId}
          opts={opts}
          onReady={this._onReady}
        />
    </div>
  }
}
