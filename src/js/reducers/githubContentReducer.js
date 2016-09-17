export default function reducer(state={
    content: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_REPO_CONTENT": {
        return {...state, fetching: true}
      }
      case "FETCH_REPO_CONTENT_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_REPO_CONTENT_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          content: action.payload,
        }
      }
    }

    return state
}
