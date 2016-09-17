export default function reducer(state={
    content: null,
    repos:[],
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
      case "FETCH_REPOS": {
        return {...state, fetching: true}
      }
      case "FETCH_REPOS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_REPOS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          repos: action.payload,
        }
      }
    }

    return state
}
