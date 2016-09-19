import React from "react"
import ReactMarkdown from "react-markdown";

import { Link } from "react-router"


export default class ForumItem extends React.Component {
  render(){
    const { forum } = this.props;
    return (
      <div>
        <h3>
          <Link to={"/forum/display/"+forum.question_id}>
            <ReactMarkdown source={forum.title} />
          </Link>
        </h3>
        <ReactMarkdown source={forum.body} />
      </div>
    );
  }
}
