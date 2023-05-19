function formatDate(timestamp) {
  let date = new Date(timestamp);
  let timeDay = "AM";
  let hour = date.getHours();

  if (hour > 12) {
    hour = `${hour}` - 12;
    timeDay = "PM";
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

function displayTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature-digit");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

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
}

let apiKey = "ff3fdecoac088fb37da86107cat4578b";
let city = "Texas";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
