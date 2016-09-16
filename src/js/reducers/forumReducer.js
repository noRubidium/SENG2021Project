export default function reducer(state={
    forum_threads: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_FORUMS_INITIATED": {
        return {...state, fetching: true}
      }
      case "FETCH_FORUMS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_FORUMS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          forum_threads: action.payload,
        }
      }
    }

    return state
}
