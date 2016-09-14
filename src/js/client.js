import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./pages/Layout"
import Video from "./components/Video"
import Tweet from "./components/Twitter"
import VideoSearch from "./components/videoSearch"
import Search from "./components/searchBar"
import store from "./store"

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Search}></IndexRoute>
      <Route path="github/:githubId" component={Tweet}></Route>
      <Route path="video/:term" component={VideoSearch}></Route>
      <Route path="video/display/:videoId" component={Video}></Route>
    </Route>
  </Router>
</Provider>, app);
