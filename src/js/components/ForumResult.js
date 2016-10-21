import React from "react"
import ReactMarkdown from "react-markdown";

import { Link } from "react-router"
import { connect } from "react-redux"
import { addForumFav } from "../actions/userActions"
import { removeForumFav } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class ForumResult extends React.Component {

  favourite(e) {
    e.preventDefault()
    if ((this.props.user.user.forumFavs).indexOf(this.props.forum) >= 0) {
      this.props.dispatch(removeForumFav(this.props.forum))
    } else {
      this.props.dispatch(addForumFav(this.props.forum))
    }
  }

  render(){
    const { forum } = this.props;

    const icon = (this.props.user.user.forumFavs).indexOf(this.props.forum) >= 0 ?
                "glyphicon glyphicon-heart pull-right": "glyphicon glyphicon-heart-empty pull-right"
    const favourite = <a href="#" onClick={this.favourite.bind(this)}><span class={icon}></span></a>

    return (
      <div>
        <div class="row">
          <div class="col-md-10">
            <h3>
              <Link to={"/forum/display/"+forum.question_id}>
                <ReactMarkdown source={forum.title} containerTagName='span' containerProps={{id:"forumReactMarkdownTitle"}}/>
              </Link>
            </h3>
          </div>
          <div class="col-md-2">
            <h3>{favourite}</h3>
          </div>
        </div>
        <div class="row col-md-12 forum-body">
          <ReactMarkdown source={forum.body} />
          <hr/>
        </div>
      </div>
    );
  }
}
