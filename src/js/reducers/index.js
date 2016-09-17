import { combineReducers } from "redux"

import forum from "./forumReducer"
import tweets from "./tweetsReducer"
import user from "./userReducer"
import videoSearch from "./videoSearchReducer"
import githubSearch from "./githubSearchReducer"
import githubContent from "./githubContentReducer"

export default combineReducers({
  forum,
  tweets,
  user,
  videoSearch,
  githubSearch,
  githubContent
})
