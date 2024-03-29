import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log(this.props)
    return (
      <div>
        <Nav location={location} history={this.props.history}/>
        <div class="container-fluid" style={{position:"absolute",top:"50%",transform: "translateY(-50%)"}}>
          <div class="row">
            <div class="col-lg-12">
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
