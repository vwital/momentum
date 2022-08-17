console.log(playList);
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
const changeQuote = document.querySelector(".change-quote");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");
const player = document.querySelector(".player");

let randomNum;
let isPlay = false;
let playNum = 0;
//Время
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
  if (
    localStorage.getItem(
      "city" === null ||
        "city.value" === "undefined" ||
        "city.value" === "!" ||
        "city.value" === " "
    )
  ) {
    city.value = "Minsk";
    localStorage.setItem("city", city.value);
    city.value = "Minsk";
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

const quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall",
    author: "Nelson Mandela",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier. ",
    author: "Mother Teresa",
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank",
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
  },
  {
    text: "Not how long, but how well you have lived is the main thing.",
    author: "Seneca",
  },
  {
    text: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.",
    author: "Henry Ford",
  },
  {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
  },
  {
    text: "My mama always said, life is like a box of chocolates. You never know what you're gonna get.",
    author: " Forrest Gump",
  },
];
let randomNumQuote;
function getRandomNumQuote() {
  randomNumQuote = Math.floor(Math.random() * 10);
}
getRandomNumQuote();

function getQuotes() {
  const QuoteText = quotes[randomNumQuote].text;
  const QuoteAuthor = quotes[randomNumQuote].author;
  quote.textContent = `${QuoteText} `;
  author.textContent = `${QuoteAuthor}`;
  getRandomNumQuote();
}
getQuotes();
changeQuote.addEventListener("click", () => {
  getQuotes();
});

//Плеер

const audio = new Audio();
function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
}
function pauseAudio() {
  audio.pause();
}

function playPauseAudio() {
  if (isPlay === false) {
    playAudio();
    isPlay = true;
  } else if (isPlay === true) {
    pauseAudio();
    isPlay = false;
  }
  console.log(isPlay);
}
const play = document.querySelector(".play");
function toggleBtn() {
  playPauseAudio();
  play.classList.toggle("pause");
}

play.addEventListener("click", toggleBtn());
function playButton() {
  if (isPlay === true) {
    play.classList.add("pause");
    isPlay = false;
  } else if (isPlay === false) {
    play.classList.remove("pause");
    isPlay = true;
  }
}

function playNextS() {
  if (playNum === 3) {
    playNum = 0;
  } else {
    playNum = playNum + 1;
    console.log(playNum);
  }
}
function playPrevS() {
  if (playNum === 0) {
    playNum = 3;
  } else {
    playNum = playNum - 1;
  }
  console.log(playNum);
}
playNext.addEventListener("click", () => {
  playNextS();
  playAudio();
  playButton();
});
playPrev.addEventListener("click", () => {
  playPrevS();
  playAudio();
  playButton();
});
import playList from "./playList.js";
console.log(playList);
