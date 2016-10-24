// this one APPENDS does not set entirely new
export function updatePreferences(preferences) {
  return {
    type: 'UPDATE_USER_PREFERENCES',
    payload: {
      preferences,
    },
  }
}

// this one deletes ONE preference
export function deletePreference(preferenceIndex) {
  return {
    type: 'DELETE_USER_PREFERENCE',
    payload: {
      preferenceIndex,
    },
  }
}

export function addVideoFav(favourite) {
  return {
    type: 'ADD_USER_VIDEO_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function removeVideoFav(favourite) {
  return {
    type: 'REMOVE_USER_VIDEO_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function addForumFav(favourite) {
  return {
    type: 'ADD_USER_FORUM_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function removeForumFav(favourite) {
  return {
    type: 'REMOVE_USER_FORUM_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function addRepoFav(favourite) {
  return {
    type: 'ADD_USER_REPO_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function removeRepoFav(favourite) {
  return {
    type: 'REMOVE_USER_REPO_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function addTodoList(item) {
  return {
    type: 'ADD_TODO_LIST',
    payload: {
      item,
    },
  }
}

export function addDoingList(item) {
  return {
    type: 'ADD_DOING_LIST',
    payload: {
      item,
    },
  }
}

export function addDoneList(item) {
  return {
    type: 'ADD_DONE_LIST',
    payload: {
      item,
    },
  }
}

export function removeTodoList(item) {
  return {
    type: 'REMOVE_TODO_LIST',
    payload: {
      item,
    },
  }
}

export function removeDoingList(item) {
  return {
    type: 'REMOVE_DOING_LIST',
    payload: {
      item,
    },
  }
}

export function removeDoneList(item) {
  return {
    type: 'REMOVE_DONE_LIST',
    payload: {
      item,
    },
  }
}

export function fetchUser() {
  return {
    type: "FETCH_USER_FULFILLED",
    payload: {
      name: "Name",
      age: 12,
    }
  }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}

export function login(auth){

  return function(dispatch){
    const callback = (result) => {
      console.log("HI!!!!")
      localStorage.setItem('id_token', result.token)
      dispatch({
        type:"LOGGEDIN",
        payload:result.token
      });
    }
    auth.on("authenticated",callback)
    auth.show()
  }
}
export function logout(){
  localStorage.removeItem('id_token');
  return {
    type: "LOGOUT",
  }
}
export function loadProfile(auth, idToken){
  return function(dispatch){
    console.log("HI!!!This is load profile")
    const callback = function(err, profile){

      console.log(profile, err)
      dispatch({
        type:"LOAD_PROFILE_FINISH",
        payload: profile,
      })
    }
    auth.getProfile(idToken, callback)
  }
}

export function updateRoot(newRoot, originalRoot){
  return {
    type: "UPDATE_ROOT",
    payload: {
      root:newRoot,
      _root:originalRoot,
    }
  }
}
