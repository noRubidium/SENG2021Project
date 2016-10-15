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
  constructor(props){
    super(props);
  }

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
            <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart pull-right"></span></a>
            : <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart-empty pull-right"></span></a>

    console.log("hiding descr")
    console.log(this.props)
    const title = this.props.titleSize ?
      <this.props.titleSize>
        <Link to={"/video/display/"+video.id.videoId}>
          {video.snippet.title}
        </Link>
        {favourite}
      </this.props.titleSize>
      :
      <h3>
        <Link to={"/video/display/"+video.id.videoId}>
          {video.snippet.title}
        </Link>
        {favourite}
      </h3>
    const description = this.props.hideDescription ? '' : <p style={{wordWrap: "break-word"}}>{video.snippet.description}</p>

    return (
      <div>
        {title}
        <Link to={"/video/display/"+video.id.videoId} class="thumbnails"><img src={video.snippet.thumbnails.medium.url} class="img-small" style={{width:"100%"}}/></Link>
        {description}
      </div>
    )
  }
}
