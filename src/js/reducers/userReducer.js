import Auth0Lock from "auth0-lock"
import flare from "../../flare.json"
import * as d3 from "d3"

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}
flare[0].children.forEach(collapse);

const tree = flare[0].name;
const oTree = flare[0];

export default function reducer(state={
    user: {
      id: null,
      name: null,
      age: null,
      videoFavs: [],
      forumFavs: [],
      repoFavs: [],
      preferences: "initial_user_pref",
      profile:{},
      token: localStorage.getItem('id_token'),
      tree: tree,
      oTree: oTree
    },
    lock: new Auth0Lock('onXEJuNLYjyGYjusgwnVJCCxxmqQq8zJ', 'seng2021.auth0.com',{
      theme: {
        logo: 'logo/Sauce.png',
        primaryColor: '#446CB3',
        title: "Log in",
      }
    }),
    fetching: false,
    fetched: false,
    error: null,
  }, action) {
    // console.log(localStorage, action)
    switch (action.type) {
      case "UPDATE_USER_PREFERENCES": {
        var prefsArray = [];
        if (state.user.preferences === "initial_user_pref") {
          prefsArray = ["IOS", "Python", "Javascript", "Dynamic Programming", "React"];
        } else {
          prefsArray = state.user.preferences.split(/\s*\|\s*/);
        }
        prefsArray = prefsArray.concat(action.payload.preferences.split(/\s*\|\s*/));
        const prefsString = prefsArray.join("|");
        return {...state, user:{...state.user, preferences: prefsString}}
      }
      case "DELETE_USER_PREFERENCE": {
        var prefsArray = [];
        if (state.user.preferences === "initial_user_pref") {
          prefsArray = ["IOS", "Python", "Java", "Javascript", "Dynamic Programming"];
        } else {
          prefsArray = state.user.preferences.split(/\s*\|\s*/);
        }
        prefsArray.splice(action.payload.preferenceIndex, 1);
        const prefsString = prefsArray.join("|");
        return {...state, user:{...state.user, preferences: prefsString}}
      }
      case "ADD_USER_VIDEO_FAVOURITE": {
        return {...state, user:{...state.user, videoFavs: [...state.user.videoFavs].concat(action.payload.favourite)}}
      }
      case "REMOVE_USER_VIDEO_FAVOURITE": {
        var original = {...state, user:{...state.user, videoFavs: [...state.user.videoFavs].concat(action.payload.favourite)}}
        for (var i = original.user.videoFavs.length - 1; i >= 0; i--) { // note: must be backwards since we are modifying the array and indexes change
          if (original.user.videoFavs[i] === action.payload.favourite) {
            original.user.videoFavs.splice(i, 1);
          }
        }
        return {...original};
      }
      case "ADD_USER_FORUM_FAVOURITE": {
        return {...state, user:{...state.user, forumFavs: [...state.user.forumFavs].concat(action.payload.favourite)}}
      }
      case "REMOVE_USER_FORUM_FAVOURITE": {
        var original = {...state, user:{...state.user, forumFavs: [...state.user.forumFavs].concat(action.payload.favourite)}}
        for (var i = original.user.forumFavs.length - 1; i >= 0; i--) { // note: must be backwards since we are modifying the array and indexes change
          if (original.user.forumFavs[i] === action.payload.favourite) {
            original.user.forumFavs.splice(i, 1);
          }
        }
        return {...original};
      }
      case "ADD_USER_REPO_FAVOURITE": {
        return {...state, user:{...state.user, repoFavs: [...state.user.repoFavs].concat(action.payload.favourite)}}
      }
      case "REMOVE_USER_REPO_FAVOURITE": {
        var original = {...state, user:{...state.user, repoFavs: [...state.user.repoFavs].concat(action.payload.favourite)}}
        for (var i = original.user.repoFavs.length - 1; i >= 0; i--) { // note: must be backwards since we are modifying the array and indexes change
          if (original.user.repoFavs[i] === action.payload.favourite) {
            original.user.repoFavs.splice(i, 1);
          }
        }
        return {...original};
      }
      case "FETCH_USER": {
        return {...state, fetching: true}
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
      case "LOGIN": {
        return {
          ...state,
          user: {... state.user, token: action.payload}
        }
      }
      case "LOGGEDIN": {
        return {
          ...state,
          user: {... state.user, token: action.payload}
        }
      }
      case "LOGOUT": {
        return {
          ...state,
          user:{...state.user, token: undefined}
        }
      }
      case "LOAD_PROFILE_FINISH": {
        return {
          ...state,
          user:{...state.user,profile:action.payload}
        }
      }
      case "UPDATE_ROOT": {
        localStorage.setItem("currRoot", action.payload)
        return {
          ...state,
          user: {
            ...state.user,
            tree: action.payload.root,
            oTree: action.payload._root
          }
        }
      }
    }

    return state
}
