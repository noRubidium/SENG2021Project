export function updatePreferences(preferences) {
  return {
    type: 'UPDATE_USER_PREFERENCES',
    payload: {
      preferences,
    },
  }
}

export function addFavourite(favourite) {
  return {
    type: 'ADD_USER_FAVOURITE',
    payload: {
      favourite,
    },
  }
}

export function removeFavourite(favourite) {
  return {
    type: 'REMOVE_USER_FAVOURITE',
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
