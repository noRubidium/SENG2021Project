import React from "react"

export default class Loading extends React.Component {
  render() {
    return (
      <div>
          <center><img src="loading.gif" style={{verticalAlign: "top", width: "120px", marginTop: "50px", marginBottom: "10px"}}/></center>
          <div class="row">
            <center><h3 class="loading" style={{color: "#446CB3"}}><strong>Squeezing our sauces</strong></h3></center>
          </div>
      </div>
    );
  }
}
