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

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="firstDate">${day}</div>
                <img
                  src="https://media.istockphoto.com/id/1297706369/vector/sun-paint-brush-strokes-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=BvQi1mWNRrgaEJ5_AhOfs7OuXiCRb91-JJUI93LlAHg="
                  alt=""
                  width="40px"
                />
                <div class="firstWeather">
                  <strong>67°</strong> <span class="minimumTemp">55°</span>
                </div>
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getCityForecast(coordinates) {
  let apiKey = "ff3fdecoac088fb37da86107cat4578b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

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

function showCelsiusTemp(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temperature-digit");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  changeTemp.innerHTML = Math.round((fahrenheitTemp - 32) * (5 / 9));
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temperature-digit");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  changeTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;
let form = document.querySelector("#search-city");
form.addEventListener("submit", cityInput);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
