import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'


const types = ["video", "language", "github"]

export default class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:"",
      type: types[0],
      getLink: e =>this.state.type + "/"+ this.state.term,
    }
  }

  render(){
    const types = ["video", "language", "github"]
    const options = types.map((item) => {
      return (<option value={item} >{item}</option>);
    })
    console.log(options);
    return (
      <div>
        <select
          value = {this.state.type}
          onChange={e => this.setState({ type:e.target.value })}
        >
          {options}
        </select>
        <input value={this.state.term}
          onKeyPress={e => {
            if(e.keyCode == 13 || e.which == 13){
              console.log(this);
              this.props.history.push(this.state.getLink());
            }
          }}
          onChange={e => this.setState({term: e.target.value})}></input>
        <Link to={this.state.getLink()}><button>Search</button></Link>
      </div>
    )
  }
}
