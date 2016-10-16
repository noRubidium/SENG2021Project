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
