import React from "react"

export default class SearchResult extends React.Component {
  render() {

    const { search } = this.props
    return (
      <div class="search-result-banner text-center">
	      <h4> Search Result for: `{search}` </h4>
    </div>
    )
  }
}
