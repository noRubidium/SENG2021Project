import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router"

import Loading from "./Loading"

import { deletePreference } from "../actions/userActions"
import { fetchForums } from "../actions/forumActions"
import { fetchForumsAppend } from "../actions/forumActions"
import { fetchVideos } from "../actions/videoSearchActions"
import { fetchRepos } from "../actions/githubActions"

import VideoResult from "./VideoResult"
import ForumResult from "./ForumResult"
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
      feed: 1, // default: All
    }
  }

  componentWillMount() {
      {/*They may not have any preferences yet*/}
      // keeps this here until we have actual user login
      const content_list = ["IOS programming", "Python", "Java", "Javascript", "Dynamic Programming"]
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

  handleFeedChange(e) {
    // e.currentTarget.dataset.id refers to:
    // 1: All
    // 2: Tutorial Videos
    // 3: Forum Threads
    // 4: Code Repositories
    // 5: Favourites
    // 6: Preferences
    console.log(e.currentTarget.dataset.id)
    this.setState({feed: parseInt(e.currentTarget.dataset.id)})
    this.forceUpdate()
    console.log(this.state)
  }

  handlePrefDelete(e) {
    // e.currentTarget.dataset.id refers to the pseudo-index in this.props.user.user.preferences to delete:
    this.props.dispatch(deletePreference(parseInt(e.currentTarget.dataset.id)))
    this.forceUpdate()

    console.log(this.state)
  }

  // just a helper function to pretty print
  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    console.log("rendering dashboard")
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

    // sort forums and repos
    var forumsSorted = forums;
    forumsSorted.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    forumsSorted = forumsSorted.filter(function (forum) {return forum.body.length <= 500;});
    var reposSorted = repos
    reposSorted = reposSorted.filter(repo => {return repo.language && repo.description && repo.forks > 100})
    reposSorted = reposSorted.sort((a,b) => {return (a.watchers > b.watchers) ? -1 : ((b.watchers > a.watchers) ? 1 : 0);} )

    // form 'Tutorial Videos'/'Forum Threads'/'Code Repositories'
    const mappedForums = forumsSorted.length ? forumsSorted.map(forum => <ForumResult key={forum.question_id} forum={forum}/>)
        : <div>No results. Try a different search term.</div>
    const mappedVideos = videos.map(video => <VideoResult video={video} key={video.id.videoId}></VideoResult>)
    const mappedRepos = reposSorted.length? reposSorted.map(repo => <GithubResult repo={repo}/>)
        : <div>No results. Try a different search term.</div>

    // form 'All' by combining all and selecting in turn
    var numEach = Math.min(mappedVideos.length, mappedForums.length, mappedRepos.length);
    var all = [];
    for (var i = 0; i < numEach; i++) {
      all.push(mappedVideos[i]);
      all.push(mappedForums[i]);
      all.push(mappedRepos[i]);
    }
    const mappedAll = all.slice(0, 15);

    // form 'Favourites' by combining all favourites and shuffling
    const favedForums = this.props.user.user.forumFavs;
    const mappedFavedForums = favedForums.map(forum => <ForumResult forum={forum}/>);
    const favedRepos = this.props.user.user.repoFavs;
    const mappedFavedRepos = favedRepos.map(repo => <GithubResult repo={repo}/>)
    const favedVideos = this.props.user.user.videoFavs;
    const mappedFavedVideos = favedVideos.map(video => <VideoResult video={video}></VideoResult>)
    var favourites = mappedFavedForums.concat(mappedFavedRepos).concat(mappedFavedVideos)
    for (var i = favourites.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        var x = favourites[i - 1];
        favourites[i - 1] = favourites[j];
        favourites[j] = x;
    }
    if (favourites.length === 0) {
      favourites = ["You have no favourites yet. Start now by exploring some trending content!"]
    }
    const mappedFavourites = favourites.slice(0, 15);

    // form 'Preferences'
    console.log("this my props homie");
    console.log(this.props);

    var preferences = [];
    if (this.props.user.user.preferences == "initial_user_pref") {
      preferences = ["IOS", "Python", "Java", "Javascript", "Dynamic Programming"];
    } else {
      preferences = this.props.user.user.preferences.split(/\s*\|\s*/);
    }

    var mappedPreferences = preferences.map((pref,index) => <li style={{borderStyle:"none"}}><span>{this.capitalizeFirstLetter(pref)}  </span><span data-id={index} onClick={this.handlePrefDelete.bind(this)} class="glyphicon glyphicon-remove"></span></li>);
    mappedPreferences = <div><h4>Your current preferences:</h4><ul>{mappedPreferences}</ul><br /><h4>Add new preference(s):</h4><PreferenceBar/></div>;

    console.log(preferences);
    console.log("mapped prefs are: ");
    console.log(mappedPreferences);


    var feed;
    switch(this.state.feed) {
      case 1: // All
        feed = mappedAll;
        break;
      case 2: // Tutorial Videos
        feed = mappedVideos;
        break;
      case 3: // Forum Threads
        feed = mappedForums;
        break;
      case 4: // Code Repositories
        feed = mappedRepos;
        break;
      case 5: // Favourites
        feed = mappedFavourites;
        break;
      case 6: // Preferences
        feed = mappedPreferences;
        break;
      default: // All
        feed = mappedAll;
    }

    var middleColTitle;
    if (feed === mappedFavourites) {
      middleColTitle = <h4>Favourites</h4>;
    } else if (feed === mappedPreferences) {
      middleColTitle = <h4>Preferences</h4>;
    } else {
      middleColTitle = <h4>Top Content For You</h4>;
    }


    return (
      <div>
        <div class="text-center">
          <h2>Welcome back to your Dashboard</h2>
        </div>

        <div class="row">
          <div class="col-md-2">
            <h4>Feeds</h4>
            <hr />
            <ul class="nav nav-pills nav-stacked">
              <li style={{borderStyle:"none"}} data-id="1" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 1 ? "active" : ""} data-toggle="pill" ><a>All</a></li>
              <li style={{borderStyle:"none"}} data-id="2" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 2 ? "active" : ""} data-toggle="pill" ><a>Tutorial Videos</a></li>
              <li style={{borderStyle:"none"}} data-id="3" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 3 ? "active" : ""} data-toggle="pill" ><a>Forum Threads</a></li>
              <li style={{borderStyle:"none"}} data-id="4" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 4 ? "active" : ""} data-toggle="pill" ><a>Code Repositories</a></li>
              <br />
              <li style={{borderStyle:"none"}} data-id="5" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 5 ? "active" : ""} data-toggle="pill" ><a>Favourites<span class="glyphicon glyphicon-heart"></span></a></li>
              <li style={{borderStyle:"none"}} data-id="6" onClick={this.handleFeedChange.bind(this)} class={this.state.feed === 6 ? "active" : ""} data-toggle="pill" ><a>Preferences<span class="glyphicon glyphicon-cog"></span></a></li>
            </ul>
          </div>
          <div class="col-md-7">
            {middleColTitle}
            <hr />
            {feed}
          </div>
          <div class="col-md-3">
            <h4>Explore New Topics</h4>
            <hr />
            <ul>
              <li style={{borderStyle:"none"}}><Link to={"all/Dijkstra's Algorithm"}>Dijkstra's Algorithm</Link></li>
              <li style={{borderStyle:"none"}}><Link to={"all/Cracking the Coding Interview"}>Cracking the Coding Interview</Link></li>
              <li style={{borderStyle:"none"}}><Link to={"all/Competitive Programming"}>Competitive Programming</Link></li>
              <li style={{borderStyle:"none"}}><Link to={"all/Django"}>Django</Link></li>
              <li style={{borderStyle:"none"}}><Link to={"all/Coding Interview Tips"}>Coding Interview Tips</Link></li>
              <li style={{borderStyle:"none"}}><Link to={"all/Artificial Intelligence"}>Artificial Intelligence</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
