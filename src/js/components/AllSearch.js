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
        <Loading />
      )
    }

    // console.log(forum_threads);
    // if(! (forum_threads.length || video_items.length || github_repos.length)){
    //   return <NoResult term={this.props.routeParams.search} history={this.props.history}/>
    // }
    const forums = forum.forum_threads.items;
    const videos = videoSearch.videos.items;
    const repos = github.repos.items;

    console.log(forum, videoSearch, github)
    if(!(forums.length || videos.length || repos.length)){
      return <NoResult term={this.props.routeParams.search} history={this.props.history}/>
    }

    // var forums_sorted = forums
    const forums_sorted = forums.sort((a,b) => b.score - a.score ).filter( (forum) => forum.body.length <= 700);
    // forums_sorted = forums_sorted
    const mappedForums = forums_sorted.length ? forums_sorted.map(forum =>  <ForumResult key={forum.question_id} forum={forum}/>)
        : [<li>No results. Try a different search term.</li>]
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)

    var repos_sorted = []
    var minFork = 64
    while(minFork > 0 && repos_sorted.length < 3){
      repos_sorted = repos.filter(repo => {return repo.language && repo.description && repo.forks > minFork}).slice(0,10)
      minFork /= 2
    }
    const mappedRepos = repos_sorted.length? repos_sorted.map(repo => <div key={repo.git_url}><GithubResult repo={repo}/></div>)
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
            <h3>Github Repositories</h3>
            <ul class="search-result">{mappedRepos}</ul>
          </div>
        </div>
      </div>
    );
  }
}
