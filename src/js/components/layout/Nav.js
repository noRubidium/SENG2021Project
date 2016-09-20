import React from "react";
import { IndexLink, Link } from "react-router";
import SearchBar from "../SearchBar";

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
      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)} style={{paddingTop:"10px", paddingBottom: "10px"}}><img src="logo/sauceDark.svg" class="nav-logo" style={{height:"40px"}}/></IndexLink>
              </li>
              {/*<li>*/}
                {/*<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}class="navbar-left"><img src="/logo/sauceDark.svg" /></IndexLink>*/}
                {/*<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>*/}
              {/*</li>*/}
              <li>
                <Link to="/Dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard {/*(the homepage for non-first-time users)*/ }</Link>
              </li>
              <li>
                <SearchBar formClass="navbar-form" dropDownShow="hidden" placeholderText="Search All"/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
