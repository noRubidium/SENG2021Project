import React from "react"

export default class PaginationButton extends React.Component {
  render() {
    const { currPage, prevPage, nextPage } = this.props
    return (
      <div class="row pagination-button">
      {
        currPage > 1?
          <button class="btn btn-default" onClick={prevPage}>&larr; Previous Page</button>
          :
          <button class="btn btn-default" disabled>&larr; Previous Page</button>
      }
      {
        currPage < 10?
          <button class="btn btn-default pull-right" onClick={nextPage}>Next Page &rarr;</button>
          :
          <button class="btn btn-default pull-right" disabled>Next Page &rarr;</button>
      }
      </div>
    )
  }
}
