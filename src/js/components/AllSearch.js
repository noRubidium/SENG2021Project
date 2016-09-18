import React from "react"
import ReactMarkdown  from 'react-markdown'
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchForums } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import { fetchRepos } from "../actions/githubActions"
import VideoResult from "./VideoResult"
import GithubResult from "./GithubResult"
import NoResult from "../pages/NoResult"

@connect((store) => {
  return {
    forum: store.forum,
    videoSearch: store.videoSearch,
    github: store.github
  };
})
export default class AllSearch extends React.Component {
  componentWillMount() {
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
    const forum_threads_json = this.props.forum.forum_threads
    const video_items_json = this.props.videoSearch.videos
    const github_repos_json = this.props.github.repos

    if ((forum_threads_json instanceof Array && !forum_threads_json.length)
        || (video_items_json instanceof Array && !video_items_json.length)
        || (github_repos_json instanceof Array && !github_repos_json.length)) {
      return (<div>Loading...</div>)
    }
    console.log(forum_threads_json);
    // if(! (forum_threads_json.length || video_items_json.length || github_repos_json.length)){
    //   return <NoResult term={this.props.routeParams.search} history={this.props.history}/>
    // }
    const forums = forum_threads_json.items;
    const videos = video_items_json.items;
    const repos = github_repos_json.items;


    var forums_sorted = forums
    forums_sorted.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    forums_sorted = forums_sorted.filter(function (forum) {return forum.body.length <= 500;});
    const mappedForums = forums_sorted.length ? forums_sorted.map(forum => <li><h3><Link to={"/forum/display/"+forum.question_id}>
        <ReactMarkdown source={forum.title} /></Link></h3>
        <ReactMarkdown source={forum.body} /></li>)
        : <li>No results. Try a different search term.</li>
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)
    const mappedRepos = repos.map(repo => <GithubResult repo={repo}/>)

    const videoRows = mappedVideos.slice(0,9)
    const repoRows = mappedRepos.slice(0,26)

    return (
      <div class="container">
        <div class="row center-text">
          <h2 >Displaying search results for '{this.props.routeParams.search}'</h2>
        </div>
        <div class="row">
          <div class="col-md-4">
            <h3>Tutorials</h3>
            {videoRows.map(video => <div class="row">{video}</div>)}
          </div>
          <div class="col-md-4">
            <h3>Forums</h3>
            <ul>{mappedForums}</ul>
          </div>
          <div class="col-md-4">
            <h3>Github Repositories</h3>
            <ul>{repoRows.map(repo => <li>{repo}</li>)}</ul>
          </div>
        </div>
      </div>
    );
  }
}
