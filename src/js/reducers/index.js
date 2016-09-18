import { combineReducers } from "redux"

import forum from "./forumReducer"
import user from "./userReducer"
import videoSearch from "./videoSearchReducer"
import github from "./githubReducer"

export default combineReducers({
  forum,
  user,
  videoSearch,
  github,
})
