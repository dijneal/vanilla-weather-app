function formatDate(timestamp) {
  let date = new Date(timestamp);
  let timeDay = "AM";
  let hour = date.getHours();

  if (hour > 12) {
    hour = `${hour}` - 12;
    timeDay = "PM";
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes} ${timeDay}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let dayForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  dayForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="firstDate">${formatDay(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"

                  alt=""
                  width="40px"
                />
                <div class="firstWeather">
                  <strong>${Math.round(
                    forecastDay.temperature.maximum
                  )}°</strong> <span class="minimumTemp">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getCityForecast(coordinates) {
  let apiKey = "ff3fdecoac088fb37da86107cat4578b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showForecast);
}

function displayTemp(response) {
  fahrenheitTemp = response.data.temperature.current;
  let tempElement = document.querySelector("#temperature-digit");
  tempElement.innerHTML = Math.round(fahrenheitTemp);

  let enterCity = document.querySelector("#city");
  enterCity.innerHTML = response.data.city;

  let condElement = document.querySelector("#condition");
  condElement.innerHTML = response.data.condition.description;

  let icon = document.querySelector("#main-img");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let feels = document.querySelector("#feel-like");
  feels.innerHTML = Math.round(response.data.temperature.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);

  getCityForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "ff3fdecoac088fb37da86107cat4578b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemp);
}

function cityInput(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-box");
  search(enterCity.value);
}

let fahrenheitTemp = null;
let form = document.querySelector("#search-city");
form.addEventListener("submit", cityInput);

search("Oakland");
