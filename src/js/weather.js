const appDescription = document.getElementById("app-descr");
const appBtn = document.getElementById("app-btn");
const inputCity = document.getElementById("city");
const btnTemp = document.querySelector(".app__btn-temp");

const apiKey = "c7972c90f0b2bbe4dc48343b795a6aac";
const apiLocationCityUrl = "https://geolocation-db.com/json/";
let city;

nowLocationCityWeather(apiLocationCityUrl, apiKey);

btnTemp.addEventListener("click", changeTemp);
appBtn.addEventListener("click", btnWeatherHandler);

function changeTemp() {
  const сelsia = document.querySelector(".temp--сelsia");
  const fahrenheit = document.querySelector(".temp--fahrenheit");
  if (btnTemp.textContent == "F") {
    btnTemp.textContent = "C";
  } else {
    btnTemp.textContent = "F";
  }
  сelsia.classList.toggle("hide");
  fahrenheit.classList.toggle("hide");
}

async function nowLocationCityWeather(url, key) {
  try {
    const request = new Request(url, {
      method: "get",
    });
    const response = await fetch(request);
    const data = await response.json();
    city = data.city;
    fetchWeather(city, key);
  } catch (error) {
    alert(error);
  }
}
async function fetchWeather(city, key) {
  try {
    const request = new Request(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=ru`,
      {
        method: "get",
      }
    );
    const response = await fetch(request);
    const data = await response.json();

    inputCity.value = "";
    const html = renderWeatherApplication(data);
    appDescription.innerHTML = "";
    appDescription.insertAdjacentHTML("afterbegin", html);
  } catch (error) {
    alert("Такого города не существует1");
  }
}

async function btnWeatherHandler() {
  if (!inputCity.value || !inputCity.value.trim()) return;
  city = inputCity.value;
  try {
    fetchWeather(city, apiKey);
  } catch (error) {
    alert("Такого города не существует2");
  }
}

function renderWeatherApplication(data) {
  return `
    <div class="app__info">
      <img src="http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png">
      <p class="app__info-weather">${data.weather[0].description}</p>
      <p class="app__info-city">Город: <span>${data.name}</span></p>
      <p class="app__info-temp temp">
        Температура: 
        <span class="temp--сelsia">${Math.ceil(data.main.temp)}°C</span>
        <span class="temp--fahrenheit hide">${Math.ceil(
          (Math.ceil(data.main.temp) * 9) / 5 + 32
        )}°F</span>
      </p>
      <p class="app__info-humidity">Влажность: <span class="humidity">${
        data.main.humidity
      }</span>%</p>
      <p class="app__info-wind">Ветер: <span class="wind">${Math.floor(
        data.wind.gust
      )}</span> км/ч</p>
    </div>
  `;
}
