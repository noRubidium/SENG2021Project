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

    const videoRaffle = ["Introduction to programming",
                         "Python 3",
                         "Developing iOS apps in Swift",
                         "Binary search",
                         "Web development"
                        ]
    const forumRaffle = ["Should I become a Software Engineer?",
                         "Is Google scared of Facebook?",
                         "How do I code a hash table?",
                         "Should I use C++ or Java in programming competitions?",
                         "What is the hardest interview question?"
                        ]
    const githubRaffle = ["Java",
                          "Python",
                          "React",
                          "JavaScript",
                          "Linux"
                         ]

    const raffleIndex = Math.floor(Math.random() * 5)

    return (
      <div class="container text-center">
      <img src="sauceLogoHome.png" class="logo-image"></img>
        <div class="row">
          <h4 class="homepage">Not sure where to begin? Select a topic.</h4>
          <button class="btn btn-default options">Learn Technologies</button>
          <button class="btn btn-default options">Discuss Topics</button>
          <button class="btn btn-default options">Explore Code</button>
        </div>
    </div>
    )
  }
}
