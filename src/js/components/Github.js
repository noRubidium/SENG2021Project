import React from "react"
import { connect } from "react-redux"

import { fetchRepoContent } from "../actions/githubActions"

@connect((store) => {
  return {
    githubContent: store.githubContent,
  };
})

export default class Github extends React.Component {
  componentWillMount() {
    const { owner, repo } = this.props.routeParams
    const name = owner + "/" + repo
    this.props.dispatch(fetchRepoContent(name))
  }

  componentWillUpdate(nextProps, nextState) {
    const { owner, repo } = this.props.routeParams
    const name = owner + repo
    const nextowner = nextProps.routeParams.owner
    const nextrepo = nextProps.routeParams.repo
    const nextname = nextowner + nextrepo
    if (nextname !== name) {
      nextProps.dispatch(fetchRepoContent(nextname))
    }
  }

  render() {
    const { githubContent } = this.props
    const { owner, repo } = this.props.routeParams

    var ReactMarkdown = require('react-markdown')

    return (
      <div>
          <h1>{owner}/{repo}</h1>
          <ReactMarkdown source={githubContent.content} />
      </div>
    );
  }
}
