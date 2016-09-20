export default function reducer(state={
    user: {
      id: null,
      name: null,
      age: null,
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
