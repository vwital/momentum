//Время
const time = document.querySelector(".time");
const myDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const body = document.querySelector("body");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

let randomNum;
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  getTimeOfDay();
  setTimeout(showTime, 1000);
}
showTime();

//Дата

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  myDate.textContent = currentDate;
}
// Время суток

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = "";
  if (hours >= 0 && hours < 6) timeOfDay = "night";
  if (hours >= 6 && hours < 12) timeOfDay = "morning";
  if (hours >= 12 && hours < 18) timeOfDay = "afternoon";
  if (hours >= 18 && hours < 24) timeOfDay = "evening";
  greeting.textContent = `Good ${timeOfDay}`;
  return timeOfDay;
}

//Имя

const name = document.querySelector(".name");
function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

window.addEventListener("load", getLocalStorage);
//Обои

function getRandomNum() {
  randomNum = Math.ceil(Math.random() * 20);
}
getRandomNum();
function setBg() {
  const timeOfDay = getTimeOfDay();
  const num = randomNum + "";
  const bgNum = num.padStart(2, 0);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/vwital/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(https://raw.githubusercontent.com/vwital/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`;
  };
}
setBg();

// Листание обоев

function getSlideNext() {
  if (randomNum === 20) {
    randomNum = 1;
  } else {
    randomNum = randomNum + 1;
  }

  setBg();
}
function getSlidePrev() {
  if (randomNum === 1) {
    randomNum = 20;
  } else {
    randomNum = randomNum - 1;
  }
  setBg();
}
slidePrev.addEventListener("click", getSlidePrev);
slideNext.addEventListener("click", getSlideNext);

//Погода
const city = document.querySelector(".city");
function myCity() {
  city.value = "Minsk";
  if (
    localStorage.getItem("city" === null) ||
    "city" === "undefined" ||
    "city" === "!"
  ) {
    city.value === "Minsk";
    localStorage.setItem("city", city.value);
  } else {
    city.value = localStorage.getItem("city");
    getWeather();
  }
  return city.value;
}
myCity();
function setLocalStorageCity() {
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setLocalStorageCity);

function getLocalStorageCity() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}
window.addEventListener("load", getLocalStorage);
console.log(myCity());
const weatherError = document.querySelector(".weather-error");
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d366b9cb418c81737502748bcf7f9253&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === "404" || data.cod === "400") {
    weatherError.textContent = `Error! city not found for ${city.value}!`;
    weatherIcon.classList = "";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherDescription.textContent = "";
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherError.textContent = "";
  }
}
city.addEventListener("change", () => {
  getWeather(city.value);
});

//Цитата
