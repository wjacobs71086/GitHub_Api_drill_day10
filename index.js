
// fetch function to get gitHub API


function fromGitHub(userName,maxResults){
  const searchURL =  'https://api.github.com/users/';
  let fullSearch = `${searchURL}${userName}/repos`;
  //console.log(fullSearch);
  fetch(fullSearch)
    .then(response => {
      if (response.ok){
        return response.json();
      }
    })
    .then(responseJson => responseJson.map(x => ({ name: x.name, link: x.clone_url, })))
    .then(displayResults);
}


//  handle submit Button
function handleSubmitRequest(){
  $('#js-form').submit(event => {
    event.preventDefault();
    let userName = $('#js-search-field').val();
    let maxResults = parseInt($('#max-results-field').val());
    
    fromGitHub(userName, maxResults);
    $('.results-list').empty();
    //console.log(maxResults);
  });
}
// js doc


// render results
function displayResults(responseJson){
  for( let i = 0; i < responseJson.length; i++){
    $('.results-list').append(`
    <a href="${responseJson[i].link}">${responseJson[i].name}</a><br>
    `);
  }

}


$(handleSubmitRequest());