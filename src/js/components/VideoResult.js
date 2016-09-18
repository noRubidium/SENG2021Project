import React from "react"
import YouTube from 'react-youtube'
import { connect } from "react-redux"
import { Link } from "react-router"

export default class VideoResult extends React.Component {
  render() {
    const video = this.props.video
    return (
      <div>
        <Link to={"/video/display/"+video.id.videoId} class="thumbnails">
          <h3>{video.snippet.title}</h3>
          <img src={video.snippet.thumbnails.medium.url} class="img-small" />
        </Link>
        <p style={{wordWrap: "break-word"}}>{video.snippet.description}</p>
      </div>
    )
  }
}
