import React from "react";
import { connect } from "react-redux"
import { fetchRepoTree } from "../actions/githubActions"
import ReactMarkdown  from 'react-markdown'
import GithubContent from './GithubContent'

@connect((store) => {
  return {
    github: store.github,
  };
})

export default class GithubRepo extends React.Component {

    componentWillMount(){
        console.log("hello",this.props)
        this.props.dispatch(fetchRepoTree(this.props.sha, this.props.name))
    }

    render() {
        if (this.props.github.tree != null){
            const current_tree = this.props.github.tree.tree
            //const mappedTrees = current_tree.map(tree => <li><GithubContent tree={tree}/></li>)
            return(<ul><li><GithubContent tree={current_tree[7]}/></li></ul>)
        } else {
            return(<h1>JNo</h1>);
        }
    }
}
