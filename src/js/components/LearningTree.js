import React from "react"
import { connect } from "react-redux"

import TreeData from "../data/learningTree"
import Tree from "../util/Tree"
import { updateRoot } from "../actions/userActions"
@connect((store) => {
  return {
    tree: store.user.user.tree,
    oTree: store.user.user.oTree,
  };
})
export default class LearningTree extends React.Component {
  drawGraph(e1){
    //console.log(e1)

    Tree.create(e1,this.redirect.bind(this), this.props.tree, this.props.oTree, this.updateRoot.bind(this))
  }
  updateRoot(root){
    this.props.dispatch(updateRoot(root))
  }
  redirect(target){
    console.log(target);
    this.props.history.push("/all/"+target)
  }
  render(){
    console.log(this)
    return (
      <div
        ref={this.drawGraph.bind(this)}
        >
        {/* <svg width="1280" height="2000"></svg> */}
      </div>
    )
  }
}
