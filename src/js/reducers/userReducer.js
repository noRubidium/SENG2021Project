export default function reducer(state={
    user: {
      id: null,
      name: null,
      age: null,
      videoFavs: [],
      forumFavs: [],
      repoFavs: [],
      preferences: "initial_user_pref",
    },
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "UPDATE_USER_PREFERENCES": {
        return {...state, user:{...state.user, preferences: action.payload.preferences}}
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
    }

    return state
}
