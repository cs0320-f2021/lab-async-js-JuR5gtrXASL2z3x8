// BEGIN REDACT
/**
 * Front end logic for providing real time autocorrect suggestions.
 */

//TODO: select the list where the suggestions should go, the input box where we're typing, and
// the loading text
//HINT: look at the hTML
const suggestionList = document.getElementById("suggestions")
const input = document.getElementsByName("text")
const loading = document.getElementById("loading")

input.forEach((input) => input.addEventListener("keyup", () => {
  //TODO: empty the suggestionList (you want new suggestions each time someone types something
  // new, hint, use .innerHTML)

  suggestionList.innerHTML = ""

  // TODO: show the loading text (HINT: set value of loading.style.display to "block" or "")

  loading.style.display = "block"

  const postParameters = {
    //TODO: get the text inside the input box (hint: use input.value to get the value of the input field)
    text: input.value
  };

  //TODO: make a post request to the url to handle this request you set in your Main.java
  //HINT: check out the GET, POST, and JSON section of the lab

    fetch('/result', {
        method: 'POST',
        body: JSON.stringify(postParameters),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((responseObject) => {
            console.log(responseObject)
            const results = responseObject['suggestions']
            let id = 0
            for (let result of results) {
                suggestionList.innerHTML += `<li tabIndex="0" id=${id.toString()}>${result}</li>`

                for (let i = 0; i <= id; i++) {
                    document.getElementById(i.toString()).addEventListener("click",
                        () => {
                            input.value = document.getElementById(i.toString()).textContent
                    })
                }

                id += 1
            }
        })

  //TODO: Parse the JSON in the response object
  //HINT: remember to get the specific field in the JSON you want to use


  //TODO: for each element in the set of results, append it to the suggestionList
  //HINT: use innerHTML += to append to teh suggestions list
  //NOTE: you should use <li> (list item) tags to wrap each element. When you do so,
  // make sure to add the attribute 'tabindex="0"' (for example: <li tabindex="0">{your element}</li>).
  // This makes each element selectable via screen reader.


  //TODO: add an click handler to each of the elements you added to the suggestionList
  // with a function which will replace whatever is in input with the suggestion that
  // was clicked


  //TODO: hide the loading text
    loading.style.display = "hidden"
}));