export default function reducer(state={
    user: {
      id: null,
      name: null,
      age: null,
      favourite: [],
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
      case "ADD_USER_FAVOURITE": {
        return {...state, user:{...state.user, favourite: [...state.user.favourite].concat(action.payload.favourite)}}
      }
      case "REMOVE_USER_FAVOURITE": {
        var original = {...state, user:{...state.user, favourite: [...state.user.favourite].concat(action.payload.favourite)}}
        for (var i = original.user.favourite.length - 1; i >= 0; i--) { // note: must be backwards since we are modifying the array and indexes change
          if (original.user.favourite[i] === action.payload.favourite) {
            original.user.favourite.splice(i, 1);
          }
        }
        const newState = {...original};
        return newState;
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
