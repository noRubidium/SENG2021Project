import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Auth0Lock from "auth0-lock"

import Layout from "./pages/Layout"
import NotFound from "./pages/NotFound"

import AllSearch from "./components/AllSearch"
import Dashboard from "./components/Dashboard"
import ForumSearch from "./components/ForumSearch"
import Forum from "./components/Forum"
import Video from "./components/Video"
import GithubSearch from "./components/GithubSearch"
import Github from "./components/Github"
import VideoSearch from "./components/VideoSearch"
import Search from "./components/HomePage"
import LearningTree from "./components/LearningTree"
import store from "./store"
import { loadProfile } from "./actions/userActions"

const app = document.getElementById('app')
const dispatch = store.dispatch
const access = (route) => {
  const { params } = route;
  localStorage.setItem("access_token", params["accessToken"])
  localStorage.setItem("id_token", params["idToken"])
  dispatch({type:"LOGGEDIN",payload:params.idToken})
  // load profile
  const lock = new Auth0Lock('onXEJuNLYjyGYjusgwnVJCCxxmqQq8zJ', 'seng2021.auth0.com',{})

  dispatch(loadProfile(lock, params.idToken))
}
const loadProf = function(){
  // load profile
  const lock = new Auth0Lock('onXEJuNLYjyGYjusgwnVJCCxxmqQq8zJ', 'seng2021.auth0.com',{})
  if(localStorage.getItem("id_token")){
    dispatch(loadProfile(lock, localStorage.getItem("id_token")))
  }
}
ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={Layout} onEnter={loadProf}>
      <IndexRoute component={Search}></IndexRoute>
      <Route path="all(/:search)" component={AllSearch}></Route>
      <Route path="dashboard" component={Dashboard}></Route>
      <Route path="forum(/:search)" component={ForumSearch}></Route>
      <Route path="forum/display/:id" component={Forum}></Route>
      <Route path="github(/:search)" component={GithubSearch}></Route>
      <Route path="github/display/:repoId" component={Github}></Route>
      <Route path="video(/:search)" component={VideoSearch}></Route>
      <Route path="video/display/:videoId" component={Video}></Route>
      <Route path="access_token=:accessToken&id_token=:idToken&token_type=:tokenType" onEnter={access}/>
      <Route path="tree" component={LearningTree} />
      <Route path="*" component={NotFound}></Route>
    </Route>
    <Route path="*" component={NotFound}></Route>
  </Router>
</Provider>, app)
