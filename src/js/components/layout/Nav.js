import React from "react";
import { IndexLink, Link } from "react-router";
import SearchBar from "../SearchBar";
import Login from "../Login";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      search_field: "",
      getLink: e => "all/"+ this.state.search_field, // only does video so far
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  updateSearchField(search) {
    this.setState({search_field: search.target.value});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-default">
        <ul class="nav navbar-nav navbar-left">
            <li><a href="#" class="navbar-links">SAUCE</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li><a href="#" class="navbar-links">DASHBOARD</a></li>
        </ul>
      </nav>
    );
  }
}
