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
export default class ForumItem extends React.Component {

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

    const favourite = (this.props.user.user.forumFavs).indexOf(this.props.forum) >= 0 ?
            <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart pull-right"></span></a>
            : <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart-empty pull-right"></span></a>

    console.log(forum.title)

    return (
      <div>
        <h3>
          <Link to={"/forum/display/"+forum.question_id} >
            <ReactMarkdown source={forum.title} containerTagName='span' containerProps={{id:"forumReactMarkdownTitle"}}/>
          </Link>
          {favourite}
        </h3>

        <ReactMarkdown source={forum.body} />
      </div>
    );
  }
}
