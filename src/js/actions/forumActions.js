import axios from "axios";

export function fetchForums() {
  return function(dispatch) {
    dispatch({type: "FETCH_FORUMS_INITIATED"});
    axios.get("https://api.stackexchange.com/2.2/search/excerpts?pagesize=5&order=desc&sort=activity&title=java&site=stackoverflow")
      .then((response) => {
        console.log(response.config);
        dispatch({type: "FETCH_FORUMS_FULFILLED", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "FETCH_FORUMS_REJECTED", payload: err});
      })
  }
}
