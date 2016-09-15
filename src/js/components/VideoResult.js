import React from "react"
import YouTube from 'react-youtube'
import { connect } from "react-redux"
import { Link } from "react-router"

export default class VideoResult extends React.Component {
  render() {
    const video = this.props.video
    console.log(video)
    return (
      <div class="col-sm-6 col-md-4">
        <Link to={"/video/display/"+video.id.videoId} class="thumbnails">
            <img src={video.snippet.thumbnails.medium.url} class="img-small" />

        </Link>
        <div class="caption">
          <Link to={"/video/display/"+video.id.videoId} class="thumbnails">
            <h3>{video.snippet.title}</h3>
          </Link>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    )
  }
}
