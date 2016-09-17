import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import Draggable from 'react-draggable';


import { fetchForums } from "../actions/forumActions"
import { fetchForumsAppend } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import { fetchRepos } from "../actions/githubActions"

import VideoResult from "./VideoResult"
import GithubResult from "./GithubResult"
import SearchBar from "./SearchBar"
import PreferenceBar from "./PreferenceBar"

@connect((store) => {
  return {
    forum: store.forum,
    videoSearch: store.videoSearch,
    user: store.user,
    github: store.github
  };
})
export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      term:"",
      type: "all",
      getLink: e => this.state.type + "/"+ this.state.term,
    }
  }

  componentWillMount() {
      {/*They may not have any preferences yet*/}
      this.props.dispatch(fetchForums("React"))
      this.props.dispatch(fetchVideos("React"))
      this.props.dispatch(fetchRepos("React"))
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.user.user.preferences !== this.props.user.user.preferences) {
      this.props.dispatch(fetchForumsAppend(nextProps.user.user.preferences))
      this.props.dispatch(fetchVideos(nextProps.user.user.preferences))
      this.props.dispatch(fetchRepos(nextProps.user.user.preferences))
    }
  }

  render() {
    const forum_threads_json = this.props.forum.forum_threads
    const video_items_json = this.props.videoSearch.videos
    const github_repos_json = this.props.github.repos

    if ((forum_threads_json instanceof Array && !forum_threads_json.length)
        || (video_items_json instanceof Array && !video_items_json.length)
        || (github_repos_json instanceof Array && !github_repos_json.length)) {
      return (<div>Loading</div>)
    }

    const forums = forum_threads_json.items;
    const videos = video_items_json.items;
    const repos = github_repos_json.items;


    var ReactMarkdown = require('react-markdown');

    var forums_sorted = forums
    forums_sorted.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    forums_sorted = forums_sorted.filter(function (forum) {return forum.body.length <= 500;});
    console.log(forums_sorted)
    const mappedForums = forums_sorted.length ? forums_sorted.map(forum => <li><h3><Link to={"/forum/display/"+forum.question_id}>
        <ReactMarkdown source={forum.title} /></Link></h3>
        <ReactMarkdown source={forum.body} /></li>)
        : <li>No results. Try a different search term.</li>
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)
    const mappedRepos = repos.map(repo => <GithubResult repo={repo}/>)

    const forumList = mappedForums.slice(0,10)
    const videoRows = mappedVideos.slice(0,9)
    const repoRows = mappedRepos.slice(0,26)

    return (
      <div class="container">
        <div class="text-center">
          <h2>Welcome back to your Programming Dashboard, Mark</h2>
        </div>
        <div class="text-center">
          <h4>Update your dashboard preferences </h4>
        </div>

        <div class="col-md-6 col-md-offset-3">
          <PreferenceBar/>
        </div>

        <div class="row">
          <div class="col-md-4">
            <h3>Tutorials</h3>
            {videoRows.map(video => <div class="row">{video}</div>)}
          </div>
          <div class="col-md-4">
            <h3>Forums</h3>
            <ul>{forumList}</ul>
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
