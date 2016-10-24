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

    // const token = this.props.user.user.token

    // <<<<<<< HEAD
      //       <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      //         <div class="container">
      //           <div class="navbar-header">
      //             <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
      //               <span class="sr-only">Toggle navigation</span>
      //               <span class="icon-bar"></span>
      //               <span class="icon-bar"></span>
      //               <span class="icon-bar"></span>
      //             </button>
      //           </div>
      //           <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
      //             <ul class="nav navbar-nav">
      //               <li>
      //                 <IndexLink to="/" onClick={this.toggleCollapse.bind(this)} style={{paddingTop:"10px", paddingBottom: "10px"}}><img src="logo/sauceDark.svg" class="nav-logo" style={{height:"40px"}}/></IndexLink>
      //               </li>
      //               {/*<li>*/}
      //                 {/*<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}class="navbar-left"><img src="/logo/sauceDark.svg" /></IndexLink>*/}
      //                 {/*<IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Home</IndexLink>*/}
      //               {/*</li>*/}
      //               <li>
      //                 {token? <Link to="/Dashboard" onClick={this.toggleCollapse.bind(this)}>Dashboard {/*(the homepage for non-first-time users)*/ }</Link>:""}
      //               </li>
      //               <li>
      //                 <SearchBar placeholderText="Search All" options="hidden"/>
      //               </li>
      //
      //             </ul>
      //             <Login />
      //           </div>
      //         </div>
      // ======= */
      //console.log(this);
    return (
      <nav class={"navbar navbar-default " + navClass}>
        <ul class="nav navbar-nav navbar-left">
            <li><a href="#" onClick={this.props.goBack}>&lt;</a></li>
            <li><IndexLink to="/" class="navbar-links">SAUCE</IndexLink></li>
            {token? <li><Link to="/dashboard" class="navbar-links">DASHBOARD</Link></li>:""}
        </ul>
        {
          location.pathname !== "/"? <SearchBar formClass="navbar-form navbar-left"/>:
          ""
        }
        <Login/>
{/* >>>>>>> 8afb4fd9eb044701c91b4b827138a665ae653861 */}
      </nav>
    );
  }
}
