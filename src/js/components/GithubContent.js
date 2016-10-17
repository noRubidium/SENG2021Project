import React from "react";
import { connect } from "react-redux"
import { fetchUrlContent } from "../actions/githubActions"
import ReactMarkdown  from 'react-markdown'

@connect((store) => {
  return {
    github: store.github,
  };
})

export default class GithubContent extends React.Component {

// <<<<<<< HEAD
// =======
//     componentWillMount(){
//         if (this.props.tree != null){
//             this.props.dispatch(fetchUrlContent(this.props.tree.url))
//         }
//     }
//
//     constructor(){
//         super()
//         this.state = {expanded: false}
//     }
//     expandCode() {
//         this.setState({
//             expanded: true
//         })
//     }
//
//     getFileContents(){
//         if (this.state.expanded) {
//             const current_tree = this.props.github.something.tree
//             const mappedTrees = current_tree.map(tree => <li><GithubContent tree={tree}/></li>)
//             return(<ul>{mappedTrees}</ul>)
//     //        console.log(this.props.tree)
//         } else {
//           return null;
//         }
//     }
//
// >>>>>>> master
    render(){
        // this should change
        // if the type of tree is "blob"
        // we should return some sort link when clicked returns content
        // if the type of tree is tree
        // just return a link to a GithubComponent
        if (this.props.tree.type == "blob"){
            return(<div>
                {this.props.tree.path}
                    </div>
                );
            } else {
                return(<div><a>
                    {this.props.tree.path}
                    </a>
                </div>)
            }
    }
}
