import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"


import { fetchForums } from "../actions/forumActions"
import { fetchForumsAppend } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import { fetchRepos } from "../actions/githubActions"

import VideoResult from "./VideoResult"
import GithubResult from "./GithubResult"
import SearchBar from "./SearchBar"
import PreferenceBar from "./PreferenceBar"
import ForumItem from "./ForumItem"

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
      this.props.dispatch(fetchForums(nextProps.user.user.preferences))
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

    const forums_sorted = forums.sort((a,b) => (b.score - a.score) ).filter( (forum) => forum.body.length <= 500);
    console.log(forums_sorted)
    const forumList = forums_sorted.length ? forums_sorted.map(forum => <ForumItem key={forum.question_id} forum={forum}/>).slice(0,10)
        :[ <li>No results. Try a different search term.</li>]

    const videoRows = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>).slice(0,5)

    const repos_sorted = repos.filter(repo => {return repo.language && repo.description && repo.forks > 100}).sort((a,b) => b.watchers - a.watchers )

    const mappedRepos = repos_sorted.length? repos_sorted.map(repo => <li><GithubResult repo={repo}/></li>)
        : <li>No results. Try a different search term.</li>


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
            <ul>{videoRows.map(video => <li>{video}</li>)}</ul>
          </div>
          <div class="col-md-4">
            <h3>Forums</h3>
            <ul>{forumList}</ul>
          </div>
          <div class="col-md-4">
            <h3>Github Repositories</h3>
            <ul>{mappedRepos}</ul>
          </div>
        </div>
      </div>
    );
  }
}
