function displayTemp(response) {
  console.log(response.data);

  let tempElement = document.querySelector("#temperature-digit");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

  let enterCity = document.querySelector("#city");
  enterCity.innerHTML = response.data.city;

  let condElement = document.querySelector("#condition");
  condElement.innerHTML = response.data.condition.description;

  let feels = document.querySelector("#feel-like");
  feels.innerHTML = Math.round(response.data.temperature.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "ff3fdecoac088fb37da86107cat4578b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
