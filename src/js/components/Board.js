import React from "react"
import { Link } from "react-router"

import { connect } from "react-redux"

import { removeTodoList } from "../actions/userActions"
import { addDoingList } from "../actions/userActions"
import { removeDoingList } from "../actions/userActions"
import { addDoneList } from "../actions/userActions"
import { removeDoneList } from "../actions/userActions"

@connect((store) => {
  return {
    user: store.user,
  };
})

export default class Board extends React.Component {

  todoToDoing(item, e) {
    console.log(item)
    this.props.dispatch(removeTodoList(item))
    console.log(this.props.user.board)
    this.props.dispatch(addDoingList(item))
    this.forceUpdate()
  }

  doingToDone(item, e) {
    console.log(item)
    this.props.dispatch(removeDoingList(item))
    this.props.dispatch(addDoneList(item))
    console.log(this.props.user.board)
    this.forceUpdate()
  }

  removeDone(item, e) {
    console.log(item)
    console.log(this.props.user.board)
    this.props.dispatch(removeDoneList(item))
    this.forceUpdate()
  }

  render() {
    const { todoList } = this.props.user.board
    const mappedTodoList = todoList.map(item => <div><a onClick={this.todoToDoing.bind(this, item)}>{ item.full_name }</a></div>)

    const { doingList } = this.props.user.board
    const mappedDoingList = doingList.map(item => <div><a onClick={this.doingToDone.bind(this, item)}>{ item.full_name }</a></div>)

    const { doneList } = this.props.user.board
    const mappedDoneList = doneList.map(item => <div><a onClick={this.removeDone.bind(this, item)}>{ item.full_name }</a></div>)

    return (
      <div>
        <div class="row">
          <div class="col-md-4">
            <h3> Todo List </h3>
            {mappedTodoList}
          </div>
          <div class="col-md-4">
            <h3> Doing List </h3>
            {mappedDoingList}
          </div>
          <div class="col-md-4">
            <h3> Done List </h3>
            {mappedDoneList}
          </div>
        </div>
      </div>
    )
  }
}
