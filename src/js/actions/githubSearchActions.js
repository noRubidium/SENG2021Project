import axios from "axios";

export function fetchRepos(language) {
  let path = "https://api.github.com/search/repositories?q=+language:" + language + "&sort=stars&order=desc"
  return function(dispatch) {
    axios.get(path)
      .then((response) => {
        dispatch({type: "FETCH_REPOS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_REPOS_REJECTED", payload: err})
      })
  }
}
