import React from "react"
import YouTube from 'react-youtube'
import { connect } from "react-redux"
import { Link } from "react-router"
import { addVideoFav } from "../actions/userActions"
import { removeVideoFav } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user
  };
})
export default class VideoResult extends React.Component {

  favourite(e) {
    e.preventDefault()
    if ((this.props.user.user.videoFavs).indexOf(this.props.video) >= 0) {
      this.props.dispatch(removeVideoFav(this.props.video))
    } else {
      this.props.dispatch(addVideoFav(this.props.video))
    }
  }

  render() {
    const video = this.props.video

    const favourite = (this.props.user.user.videoFavs).indexOf(this.props.video) >= 0 ?
            <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart"></span></a>
            : <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart-empty"></span></a>

    console.log("next")
    console.log(this.props)

    return (
      <div>
        <h3>
          <Link to={"/video/display/"+video.id.videoId}>
            {video.snippet.title}
          </Link>
          {favourite}
        </h3>
        <Link to={"/video/display/"+video.id.videoId} class="thumbnails"><img src={video.snippet.thumbnails.medium.url} class="img-small" style={{width:"100%"}}/></Link>
        <p style={{wordWrap: "break-word"}}>{video.snippet.description}</p>
      </div>
    )
  }
}
