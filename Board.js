import React from "react"
import { Link } from "react-router"

import { connect } from "react-redux"

@connect((store) => {
  return {
    user: store.user,
  };
})

export default class Board extends React.Component {

  render() {
    const { todoList } = this.props.user.board
    const mappedTodoList = todoList.map(item => <div>{{ item.full_name }}</div>)

    return (
      <div>
        <div class="row">
          <div class="col-md-4">
            {mappedTodoList}
          </div>
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
          </div>
        </div>
      </div>
    )
  }
}
