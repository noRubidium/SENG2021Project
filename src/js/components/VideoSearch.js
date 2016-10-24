import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"
import { fetchVideos } from "../actions/videoSearchActions"

import NoResult from "../pages/NoResult"
import VideoResult from "./VideoResult"
import PaginationButton from "./Pagination"

import SearchOptions from "./SearchOptions"

@connect((store) => {
  return {
    videoSearch: store.videoSearch,
    currPage: null
  }
})

export default class VideoSearch extends React.Component {
  componentWillMount() {
    document.body.style.backgroundImage = "none";
    this.props.dispatch(fetchVideos(this.props.routeParams.search, this.props.currPage))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.search !== this.props.routeParams.search) {
      nextProps.dispatch(fetchForums(nextProps.routeParams.search))
    }
  }

  updatePage(){
    this.setState({
      currPage: this.state.nextPage
    })
  }

  updateNextPage(){
    this.props.dispatch(fetchVideos(this.props.routeParams.search, this.props.videoSearch.nextPage))
  }

  updatePrevPage(){
    this.props.dispatch(fetchVideos(this.props.routeParams.search, this.props.videoSearch.prevPage))
  }

  render() {
    const { videoSearch } = this.props;
    const search = this.props.routeParams.search

    if (!videoSearch || videoSearch.fetching || !videoSearch.fetched) {
      return (
        <div class="container title-links">
          <SearchOptions search={search} active="tutorial"/>
          <Loading />
        </div>
      )
    }

    const videos = videoSearch.videos.items

    if (!videos || !videos.length){
      return <NoResult search={search} history={this.props.history}/>
    }

    const mappedVideos = videos.map(video => <VideoResult video={video}/>)
    return (
      <div class="container title-links">
        <SearchOptions search={search} active="tutorial"/>
        <ul class="search-result">{mappedVideos}</ul>
        <div class="pagination-button">
        {
          this.props.videoSearch.prevPage?
            <button class="btn btn-default" onClick={this.updatePrevPage.bind(this)}>&larr; Previous Page</button>
            :
            <button class="btn btn-default disabled">&larr; Previous Page</button>
        }
        {
          this.props.videoSearch.nextPage?
            <button class="btn btn-default pull-right" onClick={this.updateNextPage.bind(this)}>Next Page &rarr;</button>
            :
            <button class="btn btn-default pull-right disabled">Next Page &rarr;</button>
        }
        </div>
      </div>
    )
  }
}
