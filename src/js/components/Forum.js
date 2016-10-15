import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"

import { fetchRelatedForums } from "../actions/forumActions"

@connect((store) => {
  return {
    forum_threads_json: store.forum.forum_threads,
    forum: store.forum
  };
})

export default class Forum extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchRelatedForums(this.props.routeParams.id))
  }

  render() {
    const { forum_threads_json } = this.props

    if (forum_threads_json instanceof Array && !forum_threads_json.length) {
      return (<div>Illegal access (must go through a link)</div>)
    }

    const { id } = this.props.routeParams;
    const forum_threads = this.props.forum_threads_json.items;
    const target_thread = forum_threads.filter((question) => { return question.question_id == id })[0]

    const relatedItems = this.props.forum.related ? this.props.forum.related.items: '';
    const mappedRelated = relatedItems ? relatedItems.map(forum => <div class="col-md-3 text-centered"><a target="_blank" href={forum.link}><ReactMarkdown source={forum.title} /></a></div>) : ''

    var { answers } = target_thread
    answers.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    const top_answers = answers.slice(0,3)

    const topAnswersMapped = top_answers.map((answer,index) => answer.is_accepted ?
                <div><h3>Answer {index+1} - Score: {answer.score} (Accepted)</h3><ReactMarkdown source={answer.body} /></div>
                : <div><h3>Answer {index+1} - Score: {answer.score}</h3><ReactMarkdown source={answer.body} /></div>)
    return (
      <div>
        <h3><a target="_blank" href={target_thread.link}>
          <ReactMarkdown source={target_thread.title} /></a></h3>
          <ReactMarkdown source={target_thread.body} />
          <hr/>
          {topAnswersMapped}
          <hr/>
          <h3>Related Threads</h3>
          {mappedRelated}
          <br/>
      </div>
    );
  }
}
