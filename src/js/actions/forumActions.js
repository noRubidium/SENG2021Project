import axios from "axios";

export function fetchForums(searchTerm, data = {items:[]}) {
  {/*Keep API doc URL here in case need to modify*/}
  {/*https://api.stackexchange.com/docs/advanced-search#pagesize=5&order=desc&sort=votes&q=java&filter=!)EhwLl5mQ7U-rlx.UJnk4uOY391iCBL(D*WYaavThWPzcGp7H&site=stackoverflow&run=true*/}
  // console.log("SearchTerm: '" + searchTerm +"'")
  if(searchTerm == ""){
    return function(dispatch) {
      dispatch({type: "FETCH_FORUMS_FULFILLED", payload: data});
    };
  }

  let searchTerms = searchTerm.split("|")
  const currSearchTerm = searchTerms.shift()
  const restTerm = searchTerms.join("|")
  const url = "https://api.stackexchange.com/2.2/search/advanced?pagesize=10&order=desc&sort=relevance&q="+currSearchTerm+"&site=stackoverflow&filter=!)EhwLl5mQ7U05E2REsN)vnfFYU(LzU*OhEX2x5POOu3IS89Si&key=X*Dl33mPzca8jXX)58SHiQ(("

  {/*Mark you need to do some shit like searchTerm.split(',') and then utilise fetchForumsAppend (this action and reducer already set up so don't need to modify it)*/}
  return function(dispatch) {
    dispatch({type: "FETCH_FORUMS_INITIATED"});
    axios.get(url)
      .then((response) => {
        const thisData = {
          ... response.data,
          items: [...response.data.items, ...data.items],
        };
        fetchForums(restTerm, thisData)(dispatch)

      })
      .catch((err) => {
        dispatch({type: "FETCH_FORUMS_REJECTED", payload: err});
        fetchForums(restTerm, data)
      })


  }
}

{/*Variation of the above function such that it does not delete previously fetched threads. Required for Dashboard where user has multiple preferences*/}
export function fetchForumsAppend(searchTerm) {
  {/*Keep API doc URL here in case need to modify*/}
  {/*https://api.stackexchange.com/docs/advanced-search#pagesize=5&order=desc&sort=votes&q=java&filter=!)EhwLl5mQ7U-rlx.UJnk4uOY391iCBL(D*WYaavThWPzcGp7H&site=stackoverflow&run=true*/}
  const url = "https://api.stackexchange.com/2.2/search/advanced?pagesize=10&order=desc&sort=relevance&q="+searchTerm+"&site=stackoverflow&filter=!)EhwLl5mQ7U05E2REsN)vnfFYU(LzU*OhEX2x5POOu3IS89Si&key=X*Dl33mPzca8jXX)58SHiQ(("
  return function(dispatch) {
    dispatch({type: "FETCH_FORUMS_APPEND_INITIATED"});
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_FORUMS_APPEND_FULFILLED", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "FETCH_FORUMS_APPEND_REJECTED", payload: err});
      })
  }
}
