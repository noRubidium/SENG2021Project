import { combineReducers } from "redux"

import forum from "./forumReducer"
import user from "./userReducer"
import videoSearch from "./videoSearchReducer"
import github from "./githubReducer"
import video from "./videoReducer"

export default combineReducers({
  forum,
  user,
  videoSearch,
  github,  
  video,
})
