import { combineReducers } from "redux"

import tweets from "./tweetsReducer"
import user from "./userReducer"
import videoSearch from "./videoSearchReducer"

export default combineReducers({
  tweets,
  user,
  videoSearch,
})
