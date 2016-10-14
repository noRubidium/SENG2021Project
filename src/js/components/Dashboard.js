import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"

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
      // keeps this here until we have actual user login
      const content_list = ["React", "Python", "Java", "Javascript", "Rust"]
      if (this.props.user.user.preferences == "initial_user_pref") {
        this.props.dispatch(fetchForums(content_list[Math.floor(Math.random()*content_list.length)]))
        this.props.dispatch(fetchVideos(content_list[Math.floor(Math.random()*content_list.length)]))
        this.props.dispatch(fetchRepos(content_list[Math.floor(Math.random()*content_list.length)]))
      }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.user.user.preferences !== this.props.user.user.preferences) {
      this.props.dispatch(fetchForums(nextProps.user.user.preferences))
      this.props.dispatch(fetchVideos(nextProps.user.user.preferences))
      this.props.dispatch(fetchRepos(nextProps.user.user.preferences))
    }
  }

  render() {
    console.log("LOGGING PROPS")
    console.log(this.props)
    console.log("DONE LOGGING PROPS")
    const forum_threads_json = this.props.forum.forum_threads
    const video_items_json = this.props.videoSearch.videos
    const github_repos_json = this.props.github.repos

    if ((forum_threads_json instanceof Array && !forum_threads_json.length)
        || (video_items_json instanceof Array && !video_items_json.length)
        || (github_repos_json instanceof Array && !github_repos_json.length)) {
      return (<Loading />)
    }

    const forums = forum_threads_json.items;
    const videos = video_items_json.items;
    const repos = github_repos_json.items;


    var ReactMarkdown = require('react-markdown');

    var forums_sorted = forums
    forums_sorted.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    forums_sorted = forums_sorted.filter(function (forum) {return forum.body.length <= 500;});
    const mappedForums = forums_sorted.length ? forums_sorted.map(forum => <ForumItem key={forum.question_id} forum={forum}/>)
        :[ <li>No results. Try a different search term.</li>]
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)
    var repos_sorted = repos
    repos_sorted = repos_sorted.filter(repo => {return repo.language && repo.description && repo.forks > 100})
    repos_sorted = repos_sorted.sort((a,b) => {return (a.watchers > b.watchers) ? -1 : ((b.watchers > a.watchers) ? 1 : 0);} )
    const mappedRepos = repos_sorted.length? repos_sorted.map(repo => <li><GithubResult repo={repo}/></li>)
        : <li>No results. Try a different search term.</li>

    const forumList = mappedForums.slice(0,10)
    const videoRows = mappedVideos.slice(0,5)

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
