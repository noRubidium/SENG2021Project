import React from "react";
import { IndexLink, Link } from "react-router";
import SearchBar from "../SearchBar";
import Login from "../Login";

import { connect } from "react-redux";

@connect((store) => {
  return {
    user: store.user
  };
})


export default class Nav extends React.Component {

  render() {
    const { location } = this.props;
    const { token } = this.props.user.user
    const navClass = location.pathname === "/"? "navbar-invisible": "navbar-blue"

    return (
      <nav class={"navbar navbar-default " + navClass}>
        <ul class="nav navbar-nav navbar-left">
            <li><IndexLink to="/" class="navbar-links">SAUCE</IndexLink></li>
            {token? <li><Link to="/dashboard" class="navbar-links">DASHBOARD</Link></li>:""}
        </ul>
        {
          location.pathname !== "/"? <SearchBar formClass="navbar-form navbar-left"/>:
          ""
        }
        <Login/>
      </nav>
    );
  }
}
