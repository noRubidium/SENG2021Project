import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'
import SearchBar from "./SearchBar"



export default class HomePage extends React.Component {
  render(){

    const types = ["all", "video", "forum", "github"]
    const options = types.map((item) => {
      return (<option value={item} >{item}</option>);
    })
    const searchBarStyle = {
      marginTop: "60px"
    };
    const searchBarClass = {

    }

    const videoRandom = ["Introduction to programming",
                         "Python 3",
                         "Developing iOS apps in Swift",
                         "Binary search",
                         "Web development"
                        ]
    const forumRandom = ["Should I become a Software Engineer?",
                         "Is Google scared of Facebook?",
                         "How do I code a hash table?",
                         "Should I use C++ or Java in programming competitions?",
                         "What is the hardest interview question?"
                        ]
    const githubRandom = ["Java",
                          "Python",
                          "React",
                          "leon-ng9",
                          "Linux"
                         ]

    const randIndex = Math.floor(Math.random() * 5)

    return (
      <div class="container">

        <div class="row" style={{marginTop:"12em"}}>
          <div class="text-center">
            <h1>Sauce</h1>
            {/*<img class="" src="/logo/sauceWhite.svg" />*/}
            <h4>Search for any programming related topic</h4>
          </div>
        </div>

        <div class="control-group">&nbsp;</div> {/*spacer*/}
        <SearchBar searchBarStyle = {searchBarStyle} divStyle="col-md-8 col-md-offset-2 text-center" />
        <div class="control-group">&nbsp;</div> {/*spacer*/}
        <div class="control-group">&nbsp;</div> {/*spacer*/}

        <div class="row">
          <div class="text-center">
            <h4>Not sure where to begin? Select a topic.</h4>
            <div class="control-group">&nbsp;</div> {/*spacer*/}
            <Link to={'/video/'+videoRandom[randIndex]}><button class="btn btn-primary" style={{marginLeft:"5px"}}>Learn Technologies</button></Link>
            <Link to={'/forum/'+forumRandom[randIndex]}><button class="btn btn-primary" style={{marginLeft:"5px"}}>Discuss Topics</button></Link>
            <Link to={'/github/'+githubRandom[randIndex]}><button class="btn btn-primary" style={{marginLeft:"5px"}}>Explore Code</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
