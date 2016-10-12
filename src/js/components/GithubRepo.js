import React from "react";
import { connect } from "react-redux"
import { fetchRepoTree } from "../actions/githubActions"

@connect((store) => {
  return {
    github: store.github,
  };
})

export default class GithubRepo extends React.Component {

    componentWillMount(){
        console.log(this.props)
        this.props.dispatch(fetchRepoTree(this.props.sha, this.props.name))
    }

    render() {
        console.log("hussein", this.props.github.tree)
        return(<h1>Yes</h1>);
    }
}
