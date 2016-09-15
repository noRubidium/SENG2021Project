import axios from "axios";

export function fetchVideos(searchTerm) {
  const url = "https://www.googleapis.com/youtube/v3/search?maxResults=9&hl=en&part=snippet&type=video&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o&q="
  //https://www.googleapis.com/youtube/v3/search?part=snippet&q=python&type=video&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o
  searchTerm = searchTerm.replace(" ","%20")+"%20tutorial"
  return function(dispatch) {
    axios.get(url+searchTerm)
      .then((response) => {
        dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
      })
  }
}
