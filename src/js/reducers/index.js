import { combineReducers } from "redux"

import forum from "./forumReducer"
import tweets from "./tweetsReducer"
import user from "./userReducer"
import videoSearch from "./videoSearchReducer"
import github from "./githubReducer"

export default combineReducers({
  forum,
  tweets,
  user,
  videoSearch,
  github,
})
