import axios from "axios";

export function fetchForums(searchTerm) {
  {/*Keep API doc URL here in case need to modify*/}
  {/*https://api.stackexchange.com/docs/advanced-search#pagesize=5&order=desc&sort=votes&q=java&filter=!)EhwLl5mQ7U-rlx.UJnk4uOY391iCBL(D*WYaavThWPzcGp7H&site=stackoverflow&run=true*/}
  const url = "https://api.stackexchange.com/2.2/search/advanced?pagesize=5&order=desc&sort=relevance&q="+searchTerm+"&site=stackoverflow&filter=!OfZM.T6xJcUPn1bsoMfkR8KRi5efx41in(NUNmEYbue&key=X*Dl33mPzca8jXX)58SHiQ(("
  searchTerm = searchTerm.replace(" ","%20")
  return function(dispatch) {
    dispatch({type: "FETCH_FORUMS_INITIATED"});
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_FORUMS_FULFILLED", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "FETCH_FORUMS_REJECTED", payload: err});
      })
  }
}
