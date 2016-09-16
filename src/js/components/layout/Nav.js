import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      search_field: "",
      getLink: e => "video/"+ this.state.search_field, // only does video so far
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
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>
              </li>
              <li>
              <form class="navbar-form" role="search">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Search" onChange={this.updateSearchField.bind(this)}/>
                </div>
                <Link to={this.state.getLink()}><button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button></Link>
              </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
