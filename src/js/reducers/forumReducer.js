export default function reducer(state={
    forum_threads: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_FORUMS_INITIATED": {
        return {...state, fetching: true, fetched: false}
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
      case "FETCH_FORUMS_APPEND_INITIATED": {
        return {...state, fetching: true}
      }
      case "FETCH_FORUMS_APPEND_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_FORUMS_APPEND_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          forum_threads: {...state.forum_threads, items:[...state.forum_threads.items].concat(action.payload.items)},
        }
      }
    }

    return state
}
