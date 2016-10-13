import React from "react";
import { connect } from "react-redux"
import { fetchRepoTree } from "../actions/githubActions"
import ReactMarkdown  from 'react-markdown'
/*
@connect((store) => {
  return {
    github: store.github,
  };
})*/

export default class GithubContent extends React.Component {

    render(){
        // this should change
        // if the type of tree is "blob"
        // we should return some sort link when clicked returns content
        // if the type of tree is tree
        // just return a link to a GithubComponent
        return(<div>{this.props.tree.path}</div>);
    }
}
