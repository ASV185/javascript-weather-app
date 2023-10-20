//Feature 1
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

//added date
function changeImage() {
  document
    .querySelector("#background-img")
    .setAttribute(
      "src",
      `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/101/415/original/mini-pumpkins-pic.jpg?1697835983`
    );
}

setTimeout(changeImage, 10000);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
} // added function for days in the columns of forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class= "p-2 text-white bg-opacity-75 mb-2 forecast-section">
    <div class="d-flex justify-content-evenly">
      <h4 class="weather-forecast-date">${formatDay(forecastDay.time)}</h4>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png" alt="sun cloud icon" width="50" />
      <h5 class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temperature.maximum
      )}°F</h5>
      <h5 class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temperature.minimum
      )}°F</h5>
    </div>
  </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
} // added function to add forecast columns for 4 days

function getForecast(coordinates) {
  let apiKey = "6a8co22f6f92bdd5a654001ta38ff409";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);
  fahrenheitTemperature = Math.round(response.data.temperature.current);
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
  getForecast(response.data.coordinates);
} //function allows to get specific weather information in openweathermap api

function searchCity(city) {
  let apiKey = "6a8co22f6f92bdd5a654001ta38ff409";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
} //Using api key, openweathermap api, and axios to receive the weather of city

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
} //function receives value of search input of the city

function searchLocation(position) {
  let apiKey = "6a8co22f6f92bdd5a654001ta38ff409";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coordinates.longitude}&lat=${position.coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
} //function searches location with position parameter and latitude and longitude coordinates

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
} //Current location using Geolocation api

let celsiusTemperature = null;

//date feature

let dateElement = document.querySelector("#date-section");
dateElement.innerHTML = `${day}, ${month} ${date} ${hours}:${minutes}`;

//search weather

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("El Paso");

// Current location feature
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
