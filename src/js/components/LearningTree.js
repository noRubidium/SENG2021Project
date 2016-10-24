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
  updateRoot(root, oRoot){
    this.props.dispatch(updateRoot(root,oRoot))
  }
  componentWillUnmount(){
    Tree.update();
  }
  redirect(target){
    console.log(this);
    this.props.history.push("/all/"+target)
  }
  render(){
    console.log(this)
    return (
      <div>
        {/* <h1>Exploring {this.props.tree.replace(/Dev$/i,"") + " Development"} </h1> */}
        <div
          ref={this.drawGraph.bind(this)}
          >
          {/* <svg width="1280" height="2000"></svg> */}
        </div>
      </div>
    )
  }
}
