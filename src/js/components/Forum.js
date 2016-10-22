import React from "react"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"

import { fetchRelatedForums } from "../actions/forumActions"

@connect((store) => {
  return {
    forum: store.forum
  };
})

export default class Forum extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchRelatedForums(this.props.routeParams.id))
  }

  render() {
    const { forum } = this.props
    const { forum_threads } = forum

    /* LEON CHANGE THE IMPLEMENTATION THANKS */
    if (forum_threads instanceof Array && !forum_threads.length) {
      return (<div>Illegal access (must go through a link)</div>)
    }

    console.log(forum_threads)

    const { id } = this.props.routeParams;
    const threads = forum_threads.items;
    const target_thread = threads.filter((question) => { return question.question_id == id })[0]

    const relatedItems = forum.related ? forum.related.items: '';
    const mappedRelated = relatedItems ? relatedItems.map(forum => <div class="col-md-3 text-centered"><a target="_blank" href={forum.link}>
                          <ReactMarkdown source={forum.title} /></a></div>) : ''

    var { answers } = target_thread
    answers.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} );
    const top_answers = answers.slice(0,3)

    const topAnswersMapped = top_answers.map((answer,index) => <div><h3>Answer {index+1} - Score: {answer.score}
                            {answer.is_accepted ? '(Accepted)': ''}</h3><ReactMarkdown source={answer.body} /></div>)
    return (
      <div class="container title-links">
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
