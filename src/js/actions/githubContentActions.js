import axios from "axios";

export function fetchRepoContent(name) {
  const path = "https://api.github.com/repos/" + name + "/readme/"
  return function(dispatch) {
    axios.get(path, {
      headers: {
        'Authorization': 'token bff0e8d101c90760360066b75b4ac208ca6f75a0',
        'Accept': 'application/vnd.github.VERSION.raw'
      }
    })
      .then((response) => {
        dispatch({type: "FETCH_REPO_CONTENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_REPO_CONTENT_REJECTED", payload: err})
      })
  }
}
