import React from "react"
import YouTube from 'react-youtube'
import { connect } from "react-redux"
import { Link } from "react-router"

import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"

@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})
export default class Twitter extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUser())
  }

  fetchTweets() {
    this.props.dispatch(fetchTweets())
  }

  render() {
    const { user, tweets } = this.props;

    if (!tweets.length) {
      return (
      <div>
        <button onClick={this.fetchTweets.bind(this)}>load tweets</button>
        <Link to="video">video</Link>
      </div>)
    }

    const mappedTweets = tweets.map(tweet => <li><h1>{tweet.title}</h1>{tweet.body}</li>)

    return <div>
      <h1>{user.name}</h1>
      <ul>{mappedTweets}</ul>
    </div>
  }
}
