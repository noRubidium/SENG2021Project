import axios from "axios";

// export function fetchRepos(search) {
//   const path = "https://api.github.com/search/repositories?q=" + search
//   return function(dispatch) {
//     axios.get(path, {
//       headers: {
//         'Authorization': 'token bff0e8d101c90760360066b75b4ac208ca6f75a0'
//       }
//     })
//       .then((response) => {
//         dispatch({type: "FETCH_REPOS_FULFILLED", payload: response.data})
//       })
//       .catch((err) => {
//         dispatch({type: "FETCH_REPOS_REJECTED", payload: err})
//       })
//   }
// }

// <<<<<<< HEAD
// export function fetchRepos(searchTerm, data = {items:[]}) {
  // console.log("SearchTerm: '" + searchTerm +"'")
// =======
export function fetchRepos(searchTerm, currPage = 1, data = {items:[]}) {
  console.log("SearchTerm: '" + searchTerm +"'")
// >>>>>>> 2fef2185d26ca01a654a4091b5e85b9358006beb
  if(searchTerm == ""){
    return function(dispatch) {
      dispatch({type: "FETCH_REPOS_FULFILLED", payload: data});
    };
  }

  let searchTerms = searchTerm.split("|")
  const currSearchTerm = searchTerms.shift()
  const restTerm = searchTerms.join("|")
  const url = "https://api.github.com/search/repositories?sort=forks&q=" + currSearchTerm + "&page=" + currPage + "&per_page=15"
  console.log(url)
  return function(dispatch) {
    dispatch({type: "FETCH_REPOS"});
    axios.get(url/*, {
      headers: {
        'Authorization': 'token bff0e8d101c90760360066b75b4ac208ca6f75a0'
      }
    }*/)
      .then((response) => {
        const thisData = {
          ... response.data,
          items: [...response.data.items, ...data.items],
        };
        fetchRepos(restTerm, currPage, thisData)(dispatch)

      })
      .catch((err) => {
        dispatch({type: "FETCH_REPOS_REJECTED", payload: err});
        fetchRepos(restTerm, currPage, data)
      })


  }
}

export function fetchRepoContent(name) {
  const path = "https://api.github.com/repos/" + name + "/commits"
  console.log(path)
  return function(dispatch) {
    axios.get(path/*, {
      headers: {
        'Accept': 'application/vnd.github.VERSION.raw'
      }
    }*/)
      .then((response) => {
        dispatch({type: "FETCH_REPO_CONTENT_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_REPO_CONTENT_REJECTED", payload: err})
      })
  }
}

export function fetchRepoTree(sha, name){
    console.log(sha, name, "hussein is cool")
    const path = "https://api.github.com/repos/" + name +"/git/trees/" + sha
    return function(dispatch) {
      axios.get(path
        ).then((response) => {
          dispatch({type: "FETCH_REPO_TREE_FULFILLED", payload: response.data})
        })
        .catch((err) => {
          dispatch({type: "FETCH_REPO_TREE_REJECTED", payload: err})
        })
    }
}

export function fetchReadme(name){
    console.log("this is the name", name)
    const path = "https://api.github.com/repos/" + name + "/readme/"
    return function(dispatch) {
      axios.get(path, {
        headers: {
          'Accept': 'application/vnd.github.VERSION.raw'
        }
      })
        .then((response) => {
          dispatch({type: "FETCH_README_FULFILLED", payload: response.data})
        })
        .catch((err) => {
          dispatch({type: "FETCH_README_REJECTED", payload: err})
        })
    }
}
