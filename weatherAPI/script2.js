const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const humidityElement = document.querySelector(".humidity");
const locationElement = document.querySelector(".location p");
const pressureElement = document.querySelector(".pressure");
const visibilityElement = document.querySelector(".visibility");


//Alkalmazás adatai
const weather = {};

weather.temperature = { unit: "celsius" };

const key = "5c03a0c8c6452354d5675b94e2d2dfc9";
//helymeghatározás

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML =
    "<p>Nincs engedélyezve a helymeghatározás a böngészőjében</p>";
}

//helymeghatározás

function setPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  getWeather(lat, lon);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//időjárási adatok lekérése
function getWeather(lat, lon) {
  let api = `http://api.openweathermap.org./data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=hu&units=metric`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.humidity = data.main.humidity;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.pressure = data.main.pressure;
      weather.visibility = data.visibility/1000;
      
    })
    .then(function () {
      displayWeather();
    });

}
      function displayWeather() {
        iconElement.innerHTML = `<img src="img/${weather.iconId}.svg"/>`;
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        humidityElement.innerHTML = `<p>Párat.: ${weather.humidity} %</p>`;
        pressureElement.innerHTML = `<p>${weather.pressure} hPa</p>`;
        visibilityElement.innerHTML = `<p>Lát.táv.: ${weather.visibility} km</p>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city},<p>${weather.country}</p>`;
        

      }
