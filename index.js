//const apiKey = "meycjg4fBYitvoDUhWWU9uaWgxUAH9Z9Fbc5Is4y";
const url = "https://developer.nps.gov/api/v1/parks";

function prepParams(params) {
  const queryString = Object.keys(params).map(
    key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryString.join("&");
}

function getParks(apiKey, state, resultNumber) {
  const params = {
    api_key: natl_parks,
    stateCode: state,
    limit: resultNumber
  };

  const paramsString = prepParams(params);
  const finalUrl = url + "?" + paramsString;

  console.log(finalUrl);

  fetch(finalUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $(".js-error-msg").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  console.log(responseJson);

  $(".js-results-list").empty();

  for (let i = 0; i < responseJson.data.length; i++) {
    $(".js-results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
      </li>`
    );
  }

  $(".js-search-results").removeClass("hidden");
}

function handleSubmit() {
  $(".js-search").on("click", "button", event => {
    event.preventDefault();

    const maxResults = $("#max-results").val();
    const stateSelections = $("#state-chooser").val();

    getParks(apiKey, stateSelections, maxResults);

    console.log("handleSubmit ran");
  });
}

handleSubmit();
