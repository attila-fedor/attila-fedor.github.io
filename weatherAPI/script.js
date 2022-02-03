const weather_container = document.querySelector(".js-weather");

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const city = document.querySelector("[name=city]").value;
  const API_KEY = "5c03a0c8c6452354d5675b94e2d2dfc9";

  const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=hu`;
  
  fetch(API)
    .then((result) => result.json())
    .then((adatok) =>{
      weather_container.innerHTML = `

      <div class="s_w_container">
      <div class="app-title">
        <p>Időjárás</p>
      </div>
      <div class="s_notification"></div>
      <div class="s_weather-container">
        <div class="s_weather-icon">
          <img
            src="../weatherAPI/img/${adatok.weather[0].icon}.svg
        "
            alt="${adatok.weather[0].description}"
          />
        </div>
        <div class="temperature-value">
          <p>${Math.floor(adatok.main.temp)}°<span>C</span></p>
        </div>
      
        <div class="s_temperature-description desc">
          <p>${adatok.weather[0].description}</p>
        </div>
        <div class="humidity ">
        <p>Párat.: ${adatok.main.humidity} %</p>

        </div>
        <div class="pressure"><p>${adatok.main.pressure} hPa</p></div>
        <div class="visibility"><p>Lát.táv.: ${(adatok.visibility)/1000} km</p></div>
        <div class="s_location">
          <p>${adatok.name}<p>${adatok.sys.country}</p></p>
        </div>
      </div>
    </div>
`;


    });
});
