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
    const { video } = this.props

    const icon = (this.props.user.user.videoFavs).indexOf(this.props.video) >= 0 ? "glyphicon glyphicon-heart pull-right": "glyphicon glyphicon-heart-empty pull-right"
    const favourite = <a href="#" onClick={this.favourite.bind(this)}><span class={icon}></span></a>

    var HeaderSize = this.props.titleSize? this.props.titleSize: "h3";
    const title = <div class="row">
                    <div class="col-md-10 title-links" style={{wordWrap: "break-word"}}>
                      <HeaderSize>
                        <Link to={"/video/display/"+video.id.videoId} >
                          {video.snippet.title}
                        </Link>
                      </HeaderSize>
                    </div>
                    <div class="col-md-2">
                      <HeaderSize>{favourite}</HeaderSize>
                    </div>
                  </div>
    const description = this.props.hideDescription ? '' : <p style={{wordWrap: "break-word"}}>{video.snippet.description}</p>

    return (
      <div class="panel panel-default">
        <div class="panel-body">
          {title}
          { description?
            <div>
              <div class="row">
                <div class="col-md-4">
                  <Link to={"/video/display/"+video.id.videoId} class="thumbnails">
                    <img src={video.snippet.thumbnails.medium.url} class="img-small" style={{width:"100%"}}/>
                  </Link>
                </div>
                <div class="col-md-8">
                  {description}
                </div>
              </div>
              <div class="row col-md-12">
              <span class="badge pull-right">tutorials</span>
              </div>
            </div>
          :
            <div class="row col-md-10 col-md-offset-1">
              <Link to={"/video/display/"+video.id.videoId} class="thumbnails">
                <img src={video.snippet.thumbnails.medium.url} class="img-small" style={{width:"100%"}}/>
              </Link>
            </div>
          }
        </div>
      </div>
    )
  }
}
