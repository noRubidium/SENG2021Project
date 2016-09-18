import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./pages/Layout"
import AllSearch from "./components/AllSearch"
import Dashboard from "./components/Dashboard"
import ForumSearch from "./components/ForumSearch"
import Forum from "./components/Forum"
import Video from "./components/Video"
import GithubSearch from "./components/GithubSearch"
import Github from "./components/Github"
import VideoSearch from "./components/VideoSearch"
import Search from "./components/HomePage"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Search}></IndexRoute>
      <Route path="all(/:search)" component={AllSearch}></Route>
      <Route path="dashboard" component={Dashboard}></Route>
      <Route path="forum(/:search)" component={ForumSearch}></Route>
      <Route path="forum/display/:id" component={Forum}></Route>
      <Route path="github(/:search)" component={GithubSearch}></Route>
      <Route path="github/display/:repoId" component={Github}></Route>
      <Route path="video/:term" component={VideoSearch}></Route>
      <Route path="video/display/:videoId" component={Video}></Route>
    </Route>
  </Router>
</Provider>, app);
