import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchVideos } from "../actions/videoSearchActions"
import VideoResult from "./VideoResult"

@connect((store) => {
  return {
    videoSearch: store.videoSearch,
    currPage: null,
  };
})
export default class VideoSearch extends React.Component {
  componentWillMount() {
    const { videoSearch } = this.props;
    this.props.dispatch(fetchVideos(this.props.routeParams.term, this.props.currPage))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.term !== this.props.routeParams.term) {
      console.log("HI")
      nextProps.dispatch(fetchVideos(nextProps.routeParams.term, this.props.currPage))
    }
  }
  updatePage(){
    this.setState({
      currPage: this.state.nextPage
    })
  }
  updateNextPage(){
    console.log("next page: ", this.props.videoSearch.nextPage, this)
    this.props.dispatch(fetchVideos(this.props.routeParams.term, this.props.videoSearch.nextPage))
  }
  updatePrevPage(){
    console.log("next page: ", this.props.videoSearch.prevPage, this)
    this.props.dispatch(fetchVideos(this.props.routeParams.term, this.props.videoSearch.prevPage))
  }
  render() {
    const { videoSearch } = this.props;
    const videos = videoSearch.videos.items;
    if (!videos) {
      return (
      <div>
        <Link to="video">video</Link>
      </div>)
    }

    const mappedVideos = videos.map(video => <div class="col-md-4"><VideoResult video={video} key={video.id.videoId}></VideoResult></div>)
    // this.updateNextPage(videoSearch.nextPageToken)
    const rows = []
    for(let i = 0; i < 9; i+= 3){
      rows.push(<div class="row">{mappedVideos.slice(i, i+3)}</div>)
    }
    return <div >
      <h1>Search results for: '{this.props.routeParams.term}'</h1>
      {rows}
      {/*<div class="row">{mappedVideos}</div>*/}
      {
        this.props.videoSearch.prevPage?
          <button class="btn btn-default" onClick={this.updatePrevPage.bind(this)}>Previous Page</button>
          :
          <button class="btn btn-default" disabled>Previous Page</button>
      }
      {
        this.props.videoSearch.nextPage?
          <button class="btn btn-default" onClick={this.updateNextPage.bind(this)}>Next Page</button>
          :
          <button class="btn btn-default" disabled>Next Page</button>
      }
    </div>
  }
}
