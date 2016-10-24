import React from "react"
import ReactMarkdown  from 'react-markdown'
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"

import { fetchForums } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import { fetchRepos } from "../actions/githubActions"
import VideoResult from "./VideoResult"
import GithubResult from "./GithubResult"
import NoResult from "../pages/NoResult"
import ForumResult from "./ForumResult"

import SearchOptions from "./SearchOptions"

@connect((store) => {
  return {
    forum: store.forum,
    videoSearch: store.videoSearch,
    github: store.github
  };
})
export default class AllSearch extends React.Component {
  componentWillMount() {
      document.body.style.backgroundImage = "none";
      this.props.dispatch(fetchForums(this.props.routeParams.search))
      this.props.dispatch(fetchVideos(this.props.routeParams.search))
      this.props.dispatch(fetchRepos(this.props.routeParams.search))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.routeParams.search !== this.props.routeParams.search) {
      nextProps.dispatch(fetchForums(nextProps.routeParams.search))
      nextProps.dispatch(fetchVideos(nextProps.routeParams.search))
      nextProps.dispatch(fetchRepos(nextProps.routeParams.search))
    }
  }

  render() {
    const { forum, videoSearch, github } = this.props

    if (!(forum.fetched && videoSearch.fetched && github.fetched)) {
      return (
        <div class="container all-search-container">
          <SearchOptions search={search} active="all"/>

          <Loading />
        </div>
      )
    }

    const forums = forum.forum_threads.items;
    const videos = videoSearch.videos.items;
    const repos = github.repos.items;

    console.log(forum, videoSearch, github)
    if(!(forums.length || videos.length || repos.length)){
      return <NoResult term={this.props.routeParams.search} history={this.props.history}/>
    }

    const forums_sorted = forums.sort((a,b) => b.score - a.score)
    const mappedForums = forums_sorted.length? forums_sorted.map(forum => <ForumResult key={forum.question_id} forum={forum}/>)
        : [<li>No results. Try a different search term.</li>]
    const mappedVideos = videos.length? videos.map(video => <VideoResult video={video} key={video.id.videoId}/>)
        : [<li>No results. Try a different search term.</li>]

    var repos_sorted = []
    var minFork = 64
    while(minFork > 0 && repos_sorted.length < 3){
      repos_sorted = repos.filter(repo => {return repo.language && repo.description && repo.forks > minFork}).slice(0,5)
      minFork /= 2
    }

    const mappedRepos = repos_sorted.length? repos_sorted.map(repo => <GithubResult repo={repo}/>)
        : <li>No results. Try a different search term.</li>

    const forumList = mappedForums.slice(0,5)
    const videoRows = mappedVideos.slice(0,5)

    const { search } = this.props.routeParams

    return (
      <div class="container all-search-container">
        <SearchOptions search={search} active="all"/>
        <div class="row">
          <div class="col-md-4">
            <h3>Tutorials</h3>
            <ul class="search-result">{videoRows}</ul>
          </div>
          <div class="col-md-4 forumBox">
            <h3>Forums</h3>
            <ul class="search-result">{forumList}</ul>
          </div>
          <div class="col-md-4">
            <h3>Repositories</h3>
            <ul class="search-result">{mappedRepos}</ul>
          </div>
        </div>
      </div>
    );
  }
}
