import axios from "axios";

export function fetchVideos(searchTerm, pageToken=null) {
  const page= pageToken? ("&pageToken=" + pageToken) : ""
  const url = "https://www.googleapis.com/youtube/v3/search?maxResults=9&hl=en&part=snippet&type=video&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o&q="
  //https://www.googleapis.com/youtube/v3/search?part=snippet&q=python&type=video&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o
  searchTerm = searchTerm.replace(/\s*$/,"").replace(" ","%20")+"+tutorial"
  return function(dispatch) {
    axios.get(url+searchTerm + page)
      .then((response) => {
        // console.log(response)
        dispatch({type: "FETCH_VIDEOS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_VIDEOS_REJECTED", payload: err})
      })
  }
}


export function fetchVideo(videoId) {
  const url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o&id=" + videoId
  //https://www.googleapis.com/youtube/v3/search?part=snippet&q=python&type=video&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o
  return function(dispatch) {
    axios.get(url)
      .then((response) => {
        // console.log("From url: " + url, "We get:", response.data )
        dispatch({type: "FETCH_VIDEO_FULFILLED", payload: response.data.items[0].snippet})
      })
      .catch((err) => {
        dispatch({type: "FETCH_VIDEO_REJECTED", payload: err})
      })
  }
}

export function fetchRelatedVideos(videoId) {
  const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDmsTbEA0uhRwaFmxfCM8w_jyaDoFdWM1o&type=video&maxResults=4&relatedToVideoId=" + videoId
  return function(dispatch) {
    axios.get(url)
      .then((response) => {
        // console.log("From url: " + url, "We get:", response.data )
        console.log("this is the related")
        console.log(response.data)
        dispatch({type: "FETCH_RELATED_VIDEOS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_RELATED_VIDEO_REJECTED", payload: err})
      })
  }
}
