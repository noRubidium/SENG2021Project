import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'

class DropDownMenu extends React.Component {
  render() {
    const types = ["all", "video", "forum", "github"]
    const options = types.map((item, index) => {
      return (<option key={index} value={item} >{item}</option>);
    })

    return (
      <div class="row col-sm-3">
        <select class="form-control" onChange={this.props.handler}>
          {options}
        </select>
      </div>
    )
  }
}

class InputSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: this.props.term,
    }
  }

  getLink() {
     return this.props.type + "/"+ this.state.term;
  }

  render() {
    return (
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          onChange={e => this.setState({term: e.target.value})}>
        </input>
        <span class="input-group-btn">
          <Link to={this.state.term ? this.getLink(): "/"}>
            <button type="submit" class="btn btn-default" disabled={this.state.term? "":"disabled"}>
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </Link>
        </span>
      </div>
    )
  }
}

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:"",
      type: "all",
    }
    this.handler = this.handler.bind(this)
  }

  handler(e) {
    e.preventDefault()
    this.setState({type: e.target.value}, () => {
      console.log(this.state.type);
    });
 }

  render(){
    console.log("inside", this.state.type);
    if (this.props.options === "hidden") {
      return (
        <form class="navbar-form" role="search">
          <InputSearch term={this.state.term} type={this.state.type}/>
        </form>
      )
    }
    return (
        <form class="row" role="search">
          <div class="col-md-8 col-md-offset-2 text-center">
            <DropDownMenu handler={this.handler}/>
            <InputSearch term={this.state.term} type={this.state.type}/>
          </div>
        </form>
    )
  }
}
