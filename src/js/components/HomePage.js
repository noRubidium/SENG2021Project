import React from "react"
import { DropdownList } from "react-widgets"
import { Link } from "react-router"
import { browserHistory } from 'react-router'
import SearchBar from "./SearchBar"



export default class HomePage extends React.Component {

  componentWillMount() {
    document.body.style.backgroundImage = 'url("home-wallpaper.jpg")';
  }

  render(){
    const videoRaffle = ["Introduction to programming",
                         "Python 3",
                         "Developing iOS apps in Swift",
                         "Binary search",
                         "Web development"
                        ]
    const forumRaffle = ["Should I become a Software Engineer?",
                         "How do I code a hash table?",
                         "Should I use C++ or Java in programming competitions?",
                         "What is the hardest interview question?",
                         "How to start learning programming"
                        ]
    const githubRaffle = ["Java",
                          "Python",
                          "React",
                          "JavaScript",
                          "Linux"
                         ]

    const raffleIndex = Math.floor(Math.random() * 5)
    const videoLink = '/video/'+videoRaffle[raffleIndex]
    const forumLink = '/forum/'+forumRaffle[raffleIndex]
    const githubLink = '/github/'+githubRaffle[raffleIndex]

    return (
      <div class="text-center homepage-container">
        <img src="sauceLogoHome.png" class="logo-image"></img>
        <div class="row">
          <h4 class="homepage">Not sure where to begin? Select a topic.</h4>
          <SearchBar formClass="row search-bar-homepage text-center"/>
          <Link to={videoLink}><button class="btn btn-default options">Learn Technologies</button></Link>
          <Link to={forumLink}><button class="btn btn-default options">Discuss Topics</button></Link>
          <Link to={githubLink}><button class="btn btn-default options">Explore Code</button></Link>
        </div>
    </div>
    )
  }
}
