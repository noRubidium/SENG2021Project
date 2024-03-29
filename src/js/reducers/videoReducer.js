export default function reducer(state={
    video: null,
    related: [],
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_VIDEO": {
        return {...state, fetching: true}
      }
      case "FETCH_VIDEO_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_VIDEO_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          video: action.payload,
        }
      }
      case "FETCH_RELATED_VIDEOS": {
        return {...state, fetching: true}
      }
      case "FETCH_RELATED_VIDEOS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_RELATED_VIDEOS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          related: action.payload,
        }
      }
    }

    return state
}
