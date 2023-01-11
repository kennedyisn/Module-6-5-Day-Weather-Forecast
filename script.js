// This page of js is to convert the searched city from the User into coordinates then pass that through to the API to gather results
var userFormEl = document.querySelector('#user-form')

// Function to retreive Weather Data from searched city
function getSearchedCitycoord(event) {
    event.preventDefault();

    //var here will be plugged into a string to create the API link to call back data
    var searchedCityVal = document.querySelector('').value

    // boolean to report an error if there is nothing in the search bar
    if (!searchedCityVal) {
        console.error('Please enter a valid city to search!');
        return;
    }
    // Geocoding API to turn the city searched into coordinates
    var geocoordString = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchedCityVal + '&limit=1&appid={5e2ebb8607ff1ac7e13aeaa989acb581}'

    location.assign(geocoordString);
}

// event listener to get the coordinates for the city submitted by the user
userFormEl.addEventListener('submit', getSearchedCitycoord);