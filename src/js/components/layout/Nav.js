import React from "react";
import { IndexLink, Link } from "react-router";
import SearchBar from "../SearchBar";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
      search_field: "",
      getLink: e => "all/"+ this.state.search_field,
      fullscreen: false,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  updateSearchField(search) {
    this.setState({search_field: search.target.value});
  }

  toggleFullscreen(e) {
    console.log("toggling")
    e.preventDefault();
    this.setState({fullscreen: !this.state.fullscreen});
    this.refs.fullscreenInput.focus();
  }

  submitFullscreen() {
    this.setState({fullscreen: false}); // differs from the above in that don't prevent default (submit) and cbf more elegant solution
  }

  render() {

    console.log(this.state)

    const { location } = this.props;
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    const { fullscreen } = this.state;
    const searchClass = fullscreen ? "open" : "";

    return (
      <nav class="navbar navbar-default navbar-fixed-top"  role="navigation">
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
            <ul class="nav navbar-nav" style={{display:"inline-block", listStyleType:"none"}}>
              <li>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)} style={{paddingTop:"5px", paddingBottom: "5px"}}>
                  <img src="logo/sauceDark.svg" class="nav-logo" style={{height:"50px"}}/>
                </IndexLink>
              </li>
              <li>
                <Link to="/Dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard</Link>
              </li>
              <li >
                {/*Need link wrapper to make it align properly*/}
                <Link to="/" onClick={this.toggleFullscreen.bind(this)} style={{fontWeight:"bold"}}>Search</Link>
              </li>
            </ul>

          </div>


        </div>


        <div id="search" class={searchClass}>
            <button type="button" class="closeBtn" onClick={this.toggleFullscreen.bind(this)}>&nbsp;x&nbsp;</button>
            <form>
            <input ref="fullscreenInput" type="search" placeholder="type keyword(s) here" onChange={this.updateSearchField.bind(this)} />
            <Link to={this.state.getLink()} onClick={this.submitFullscreen.bind(this)}>
              <button type="button" class="btn btn-default" >Search</button>
            </Link>
            </form>
        </div>
      </nav>
    );
  }
}
