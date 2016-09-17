import axios from "axios";

export function fetchForums(searchTerm) {
  const url = "https://api.stackexchange.com//2.2/search/advanced?pagesize=3&order=desc&sort=votes&tagged=" + searchTerm + "&site=stackoverflow&filter=!)rjtA(EdGKGjGMtWs1jp"
  searchTerm = searchTerm.replace(" ","%20")
  return function(dispatch) {
    dispatch({type: "FETCH_FORUMS_INITIATED"});
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_FORUMS_FULFILLED", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "FETCH_FORUMS_REJECTED", payload: err});
      })
  }
}
