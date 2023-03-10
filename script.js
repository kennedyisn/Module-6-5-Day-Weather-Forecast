var citynameInputEl = document.querySelector('#cityname');
var apiKey = "5e2ebb8607ff1ac7e13aeaa989acb581";
var dailyDisplayContainer = document.getElementById("daily-display");
var dailyForecastEl = document.getElementById("daily-forecastinfo");
var pastSearches = [];

function priorSearches(cityname) {
  var pastSearch = cityname;
  localStorage.setItem('savedSearch', pastSearch);
  console.log(pastSearch);
  pastSearches.push(pastSearch);
  console.log('Past weather searches: ' + pastSearches);
  localStorage.setItem('pastSearches',(pastSearches));
  createUniqueButtonsFromArray(pastSearches)
}

var btn = document.getElementById("btn");
btn.addEventListener("click", function(event) {
  console.log("Clicked")
  event.preventDefault();
  
  var cityname = citynameInputEl.value.trim();
  console.log("City: ", cityname);
  if (cityname) {
     geoFind(cityname)
     priorSearches(cityname)
    citynameInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
})

function geoFind(city) {
  var geoUrl =`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  fetch(geoUrl) 
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      console.log(lat, lon)

      get5DayWeatherData(lat, lon)
      getTodaysWeatherData(lat, lon)
    })
}

function get5DayWeatherData(lat, lon) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => { 
      console.log(data);
      var weeklyData = data;
      console.log(weeklyData)

      display5DayForecast(weeklyData)
    })
}

function getTodaysWeatherData(lat, lon) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => { 
    console.log(data);
    var dailyData = data;
    console.log(dailyData)

    displayTodaysForecast(dailyData)
  })
}

function display5DayForecast(weeklyData) {
  console.log(weeklyData)

  var weeklyHeader1 = weeklyData.list[0].dt_txt;
  $('#day1-header').text(weeklyHeader1);

  var weeklyTemp1 = weeklyData.list[0].main.temp;
  $('#daily-temp1').text('Temp: ' + weeklyTemp1 + '° F');

  var weeklySpeed1 = weeklyData.list[0].wind.speed;
  $('#daily-wind1').text(' Wind: ' + weeklySpeed1 + ' MPH');
    
  var weeklyHumidity1 = weeklyData.list[0].main.humidity;
  $('#daily-humidity1').text('Humidity: ' + weeklyHumidity1 + '%');

  var day1Icon = weeklyData.list[0].weather[0].icon
  var day1URL = 'http://openweathermap.org/img/w/' + day1Icon + '.png';
  $('#day1-icon').attr('src', day1URL);

  var weeklyHeader2 = weeklyData.list[8].dt_txt;
  $('#day2-header').text(weeklyHeader2);

  var weeklyTemp2 = weeklyData.list[8].main.temp;
  $('#daily-temp2').text('Temp: ' + weeklyTemp2 + '° F');

  var weeklySpeed2 = weeklyData.list[8].wind.speed;
  $('#daily-wind2').text(' Wind: ' + weeklySpeed2 + ' MPH');
    
  var weeklyHumidity2 = weeklyData.list[8].main.humidity;
  $('#daily-humidity2').text('Humidity: ' + weeklyHumidity2 + '%');

  var day2Icon = weeklyData.list[8].weather[0].icon
  var day2URL = 'http://openweathermap.org/img/w/' + day2Icon + '.png';
  $('#day2-icon').attr('src', day2URL);

  var weeklyHeader3 = weeklyData.list[16].dt_txt;
  $('#day3-header').text(weeklyHeader3);

  var weeklyTemp3 = weeklyData.list[16].main.temp;
  $('#daily-temp3').text('Temp: ' + weeklyTemp3 + '° F');

  var weeklySpeed3 = weeklyData.list[16].wind.speed;
  $('#daily-wind3').text(' Wind: ' + weeklySpeed3 + ' MPH');
    
  var weeklyHumidity3 = weeklyData.list[16].main.humidity;
  $('#daily-humidity3').text('Humidity: ' + weeklyHumidity3 + '%');

  var day3Icon = weeklyData.list[16].weather[0].icon
  var day3URL = 'http://openweathermap.org/img/w/' + day3Icon + '.png';
  $('#day3-icon').attr('src', day3URL);

  var weeklyHeader4 = weeklyData.list[24].dt_txt;
  $('#day4-header').text(weeklyHeader4);

  var weeklyTemp4 = weeklyData.list[24].main.temp;
  $('#daily-temp4').text('Temp: ' + weeklyTemp4 + '° F');

  var weeklySpeed4 = weeklyData.list[24].wind.speed;
  $('#daily-wind4').text(' Wind: ' + weeklySpeed4 + ' MPH');
    
  var weeklyHumidity4 = weeklyData.list[24].main.humidity;
  $('#daily-humidity4').text('Humidity: ' + weeklyHumidity4 + '%');

  var day4Icon = weeklyData.list[24].weather[0].icon
  var day4URL = 'http://openweathermap.org/img/w/' + day4Icon + '.png';
  $('#day4-icon').attr('src', day4URL);

  var weeklyHeader5 = weeklyData.list[32].dt_txt;
  $('#day5-header').text(weeklyHeader5);

  var weeklyTemp5 = weeklyData.list[32].main.temp;
  $('#daily-temp5').text('Temp: ' + weeklyTemp5 + '° F');

  var weeklySpeed5 = weeklyData.list[32].wind.speed;
  $('#daily-wind5').text(' Wind: ' + weeklySpeed5 + ' MPH');
    
  var weeklyHumidity5 = weeklyData.list[32].main.humidity;
  $('#daily-humidity5').text('Humidity: ' + weeklyHumidity5 + '%');

  var day5Icon = weeklyData.list[32].weather[0].icon
  var day5URL = 'http://openweathermap.org/img/w/' + day5Icon + '.png';
  $('#day5-icon').attr('src', day5URL);
}

function displayTodaysForecast(dailyData) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${month}-${day}-${year}`;
  console.log(currentDate);
  $('#daily-header').text('Date: ' + currentDate);

  var dailyTemp = dailyData.main.temp;
  $('#daily-temp').text('Temp: ' + dailyTemp + '° F');

  var dailySpeed = dailyData.wind.speed;
  $('#daily-wind').text('Wind: ' + dailySpeed + ' MPH');
    
  var dailyHumidity = dailyData.main.humidity;
  $('#daily-humidity').text('Humidity: ' + dailyHumidity + '%');

  var dailyIcon = dailyData.weather[0].icon
  var iconURL = 'http://openweathermap.org/img/w/' + dailyIcon + '.png';
  $('#header-icon').attr('src', iconURL);
}

function createUniqueButtonsFromArray(pastSearches) {
  let uniqueChars = [...new Set(pastSearches)];
  if (uniqueChars.length>=9) {
    uniqueChars.shift();
  }
  console.log(uniqueChars);
  $("#past-searches").empty()
  $.each(uniqueChars, function(index, cityname) {
    var button = $('<button/>', {
      text: cityname,
      value: cityname,
      class: 'past-searches',
      click: function() {
        // passed button value to geoFind
        var searchedcityVal = $(this).text();
        geoFind(searchedcityVal);
      }
    });
      // append to button class
      $('#past-searches').append(button);
  });
}