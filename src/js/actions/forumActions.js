import axios from "axios";

export function fetchForums(searchTerm) {
  const url = "https://api.stackexchange.com/2.2/search/excerpts?pagesize=5&order=desc&sort=votes&accepted=True&tagged="+searchTerm+"&site=stackoverflow"
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
