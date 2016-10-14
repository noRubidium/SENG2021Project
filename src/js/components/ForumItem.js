import React from "react"
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux"

import { Link } from "react-router"
import { addFavourite } from "../actions/userActions"
import { removeFavourite } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})
export default class ForumItem extends React.Component {

  favourite(e) {
    e.preventDefault()
    if ((this.props.user.user.favourite).indexOf(this.props.forum.question_id) >= 0) {
      this.props.dispatch(removeFavourite(this.props.forum.question_id))
    } else {
      this.props.dispatch(addFavourite(this.props.forum.question_id))
    }
  }

  render(){
    const { forum } = this.props;

    console.log(this.props.user.user.favourite);

    const favourite = (this.props.user.user.favourite).indexOf(this.props.forum.question_id) >= 0 ?
            <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart"></span></a>
            : <a href="#" onClick={this.favourite.bind(this)}><span class="glyphicon glyphicon-heart-empty"></span></a>


    console.log((this.props.user.user.favourite).indexOf(this.props.forum.question_id))

    return (
      <div>
        <h3>
          <Link to={"/forum/display/"+forum.question_id} style={{float:"left"}}>
            <ReactMarkdown source={forum.title} />
          </Link>
          {favourite}
        </h3>
        <ReactMarkdown source={forum.body} />
      </div>
    );
  }
}
