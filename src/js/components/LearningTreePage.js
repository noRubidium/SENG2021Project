import React from "react"
import LearningTree from "./LearningTree"

export default class LearningTreePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showWebDev:false,
    }
  }
  showWebDev(){
    this.setState({showWebDev:true})
  }
  render(){

    const icon_style = {textAlign:"center","cursor":"pointer", margin:"20px 0"};
    if(!this.state.showWebDev){
      return (
        <div class="row">
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/web-dev.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Web Development</h4>
          </div>
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/machine-learning.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Machine Learning</h4>
          </div>
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/mobile-dev.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Mobile Development</h4>
          </div>
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/interview.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Interview Prep</h4>
          </div>
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/algorithm.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Algorithm Master</h4>
          </div>
          <div onClick={this.showWebDev.bind(this)} class="col-md-4" style={icon_style}>
            <img src="img/lang.png" class="img-responsive" style={{"margin":"auto","width": "30%"}}/>
            <h4>Programming Language</h4>
          </div>
        </div>
      )
    }
    return (<div>
      <LearningTree history={this.props.history} />
    </div>)
  }
}
