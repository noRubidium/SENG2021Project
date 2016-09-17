import React from "react";


export default class Footer extends React.Component {
  render() {
    const footerStyle = {
      right: "0",
      bottom: "0",
      left: "0",
      padding: "1rem",
      backgroundColor: "#efefef",
      textAlign: "center",
    }

    return (
      <div style={footerStyle}>
        '&#47;&#47;TODO: Team Name' (Hussein, Jessica, Leon, Mazen, Minjie)
      </div>
    );
  }
}
