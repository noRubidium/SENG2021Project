import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchVideos } from "../actions/videoSearchActions"
import VideoResult from "./VideoResult"
import NoResult from "../pages/NoResult"
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
      nextProps.dispatch(fetchVideos(nextProps.routeParams.term, this.props.currPage))
    }
  }
  updatePage(){
    this.setState({
      currPage: this.state.nextPage
    })
  }
  updateNextPage(){
    this.props.dispatch(fetchVideos(this.props.routeParams.term, this.props.videoSearch.nextPage))
  }
  updatePrevPage(){
    this.props.dispatch(fetchVideos(this.props.routeParams.term, this.props.videoSearch.prevPage))
  }
  render() {
    const { videoSearch } = this.props;
    const videos = videoSearch.videos.items;
    console.log(videoSearch)
    if ((!videoSearch) || videoSearch.fetching || (!videos)) {
      return (
      <div>
        Loading...
      </div>)
    }
    if(!videos.length){
      // console.log(this.props)
      return (
        <NoResult term={this.props.routeParams.term} history={this.props.history}/>
      )
    }
    const mappedVideos = videos.map(video => <div class="col-md-4" key={video.id.videoId}><VideoResult video={video}></VideoResult></div>)
    // this.updateNextPage(videoSearch.nextPageToken)
    const rows = []
    for(let i = 0; i < 9; i+= 3){
      rows.push(<div class="row" key={"video-result-row-" + i}>{mappedVideos.slice(i, i+3)}</div>)
    }
    return <div >
      <h1>Search results for: '{this.props.routeParams.term}'</h1>
      {rows}
      {/*<div class="row">{mappedVideos}</div>*/}
      {
        this.props.videoSearch.prevPage?
          <button class="btn btn-default" onClick={this.updatePrevPage.bind(this)}>&larr; Previous Page</button>
          :
          <button class="btn btn-default" disabled>&larr; Previous Page</button>
      }
      {
        this.props.videoSearch.nextPage?
          <button class="btn btn-default pull-right" onClick={this.updateNextPage.bind(this)}>Next Page &rarr;</button>
          :
          <button class="btn btn-default pull-right" disabled>Next Page &rarr;</button>
      }
    </div>
  }
}
