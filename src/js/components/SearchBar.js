import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:"",
      type: "all",
      getLink: e => this.state.type + "/"+ this.state.term,
    }
  }

  getLink(){
     return this.state.type + "/"+ this.state.term;
   }
  render(){

    const types = ["all", "video", "forum", "github"]
    const options = types.map((item) => {
      return (<option value={item} >{item}</option>);
    })
    const searchBarClass = {
      dropDownShow: this.props.dropDownShow || "",
      divStyle: this.props.divStyle || "",
      formClass: this.props.formClass || "row",
    }

    return (
        <form class={searchBarClass.formClass} role="search">
          <div class={searchBarClass.divStyle}>
            <div class={searchBarClass.dropDownShow + " col-sm-3 "}>
              <select class="form-control" onChange={e => this.setState({type: e.target.value})}>
                  {options}
              </select>
            </div>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder={this.props.placeholderText || "Search"}
                onChange={e => this.setState({term: e.target.value})}>
              </input>
              <span class="input-group-btn">
                <Link to={this.state.getLink()}>
                  <button type="submit" class="btn btn-default">
                    <span class="glyphicon glyphicon-search"></span>
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </form>
    )
  }
}
