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
const RU = document.querySelector(".RU");
let randomNum;
let isPlay = false;
let playNum = 0;
let lang = "EN";
let langW = "en";
//Время
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;

  if (lang === "RU") {
    getTimeOfDayRU();
    showDateRU();
    getWeather.url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=d366b9cb418c81737502748bcf7f9253&units=metric`;
  } else {
    getTimeOfDay();
    showDate();
  }

  setTimeout(showTime, 100);
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
function showDateRU() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const currentDate = date.toLocaleDateString("ru-RU", options);
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

function getTimeOfDayRU() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay = "";
  if (hours >= 0 && hours < 6) timeOfDay = "Доброй ночи";
  if (hours >= 6 && hours < 12) timeOfDay = "Доброе утречко";
  if (hours >= 12 && hours < 18) timeOfDay = "Добрый день";
  if (hours >= 18 && hours < 24) timeOfDay = "Добрый вечер";
  greeting.textContent = `${timeOfDay}`;
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
console.log(city.value);

window.addEventListener("load", getLocalStorage);
const weatherError = document.querySelector(".weather-error");
async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${
    city.value
  }&lang=${lang.toLowerCase()}&appid=d366b9cb418c81737502748bcf7f9253&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(langW);
  if (lang === "EN") {
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
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      weatherError.textContent = "";
    }
    if (city.value[0] === ",") {
      console.log("err");
      weatherError.textContent = `Error! city not found for ${city.value}!`;
      weatherIcon.classList = "";
      temperature.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
      weatherDescription.textContent = "";
    }
  } else if ((lang = "RU")) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${
      city.value
    }&lang=${lang.toLowerCase()}&appid=d366b9cb418c81737502748bcf7f9253&units=metric`;
    console.log(langW);
    if (data.cod === "404" || data.cod === "400") {
      weatherError.textContent = `Ошибка. Город: ${city.value} не найден!`;
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
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
      weatherError.textContent = "";
    }
    if (city.value[0] === ",") {
      console.log("err");
      weatherError.textContent = `Ошибка. Город: ${city.value} не найден!`;
      weatherIcon.classList = "";
      temperature.textContent = "";
      wind.textContent = "";
      humidity.textContent = "";
      weatherDescription.textContent = "";
    }
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
  currentTrack();
  audio.currentTime = 0;
  audio.play();
  songName();
}
function pauseAudio() {
  audio.pause();
}

const play = document.querySelector(".play");
function toggleBtn() {
  if (isPlay === true) {
    play.classList.remove("pause");
    pauseAudio();

    isPlay = false;
  } else if (isPlay === false) {
    play.classList.add("pause");
    playAudio();
    isPlay = true;
  }
}
play.addEventListener("click", () => {
  toggleBtn();
});

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
  }
}
function playPrevS() {
  if (playNum === 0) {
    playNum = 3;
  } else {
    playNum = playNum - 1;
  }
}
playNext.addEventListener("click", () => {
  playNextS();
  // playAudio();
  isPlay = true;
  playButton();
  toggleBtn();
});
playPrev.addEventListener("click", () => {
  playPrevS();
  // playAudio();
  isPlay = true;
  playButton();
  toggleBtn();
});

import playList from "./playList.js";

const playListContainer = document.querySelector(".play-list");
playList.forEach((el) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = `${el.title}`;
  playListContainer.append(li);
});

let prevNum;
let nextNum;
if (playNum === 0) {
  prevNum = 3;
} else {
  prevNum = playNum - 1;
}
if (playNum === 3) {
  nextNum = 0;
} else {
  nextNum = playNum + 1;
}

const playItem = document.querySelectorAll("li");
function currentTrack() {
  if (playNum === 0) {
    prevNum = 3;
  } else {
    prevNum = playNum - 1;
  }
  if (playNum === 3) {
    nextNum = 0;
  } else {
    nextNum = playNum + 1;
  }
  playItem[playNum].classList.add("item-active");
  playItem[prevNum].classList.remove("item-active");
  playItem[nextNum].classList.remove("item-active");
}

const currentSong = document.querySelector(".current-song");
function songName() {
  currentSong.innerHTML = playList[playNum].title;
}
const timeLine = document.querySelector(".timeline");

timeLine.addEventListener(
  "click",
  (e) => {
    const timeLineWidth = window.getComputedStyle(timeLine).width;
    const timeToSeek = (e.offsetX / parseInt(timeLineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);
setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  document.querySelector(".current").textContent = getTimeCodeFormNum(
    audio.currentTime
  );
  // if (progressBar.style.width === "100%") {
  //   playNextS();
  //   playAudio();
  // }
}, 200);

audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".length").textContent = getTimeCodeFormNum(
      audio.duration
    );
  },
  false
);

function getTimeCodeFormNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

const range = document.querySelector(".volume");

range.addEventListener("change", (e) => {
  audio.volume = e.target.value / 100;
});

const speaker = document.querySelector(".speaker");
speaker.addEventListener("click", () => {
  speaker.classList.toggle("mute");
  if (audio.volume > 0) {
    audio.volume = 0;
  } else {
    audio.volume = 0.5;
  }
});
const greetingContainer = document.querySelector(".greeting-container");
const weather = document.querySelector(".weather");
const myQuote = document.querySelector(".my-quote");
const settings = document.querySelector(".settings ");
const settingsContainer = document.querySelector(".settings-container ");
const language = document.querySelector(".language ");
const EN = document.querySelector(".EN ");
const languageSet = document.querySelector(".my-language");
const playerSet = document.querySelector(".player-set ");
const weatherSet = document.querySelector(".weather-set ");
const timeSet = document.querySelector(".time-set ");
const dateSet = document.querySelector(".date-set ");
const greetingSet = document.querySelector(".greeting-set ");
const quoteSet = document.querySelector(".quote-set ");
const changeQuoteButton = document.querySelector(".change-quote");

settings.addEventListener("click", () => {
  settingsContainer.classList.toggle("show");
});

playerSet.addEventListener("click", () => {
  player.classList.toggle("hidden");
  playListContainer.classList.toggle("hidden");
});
weatherSet.addEventListener("click", () => {
  weather.classList.toggle("hidden");
});
quoteSet.addEventListener("click", () => {
  myQuote.classList.toggle("hidden");
  changeQuoteButton.classList.toggle("hidden");
});
dateSet.addEventListener("click", () => {
  myDate.classList.toggle("hidden");
});
timeSet.addEventListener("click", () => {
  time.classList.toggle("hidden");
});
greetingSet.addEventListener("click", () => {
  greetingContainer.classList.toggle("hidden");
});

window.addEventListener("beforeunload", getLocalStorageSettings);

function getLocalStorageSettings() {
  localStorage.getItem(greetingContainer.classList);
  localStorage.getItem(time.classList);
}
EN.classList.add("myLang");
console.log(quotes[0].author);
RU.addEventListener("click", () => {
  lang = "RU";
  document.getElementsByName("yourName")[0].placeholder = "[Введите имя]";
  document.getElementsByName("yourCity")[0].placeholder = "Введите город";
  playerSet.innerHTML = '<input type="checkbox" checked> Плеер';
  weatherSet.innerHTML = '<input  type="checkbox" checked> Погода';
  timeSet.innerHTML = '<input  type="checkbox" checked> Время';
  dateSet.innerHTML = '<input  type="checkbox" checked> Дата';
  greetingSet.innerHTML = '<input  type="checkbox" checked> Приветствие';
  quoteSet.innerHTML = '<input type="checkbox" checked> Цитата';
  languageSet.innerHTML = "Язык:";

  quotes[0].author = "Наполеон Хилл";
  quotes[0].text =
    "Что разум человека может постигнуть и во что он может поверить, того он способен достичь";
  quotes[1].author = "Альберт Эйнштейн";
  quotes[1].text = "Стремитесь не к успеху, а к ценностям, которые он дает​";
  quotes[2].author = "Амелия Эрхарт";
  quotes[2].text =
    "Сложнее всего начать действовать, все остальное зависит только от упорства.";
  quotes[3].author = "Студент RSSchool";
  quotes[3].text = "Блин, ещё цитаты где-то искать... ";
  quotes[4].author = "Стив Джобс";
  quotes[4].text = " Ваше время ограничено, не тратьте его, живя чужой жизнью";
  quotes[5].author = "Христофор Колумб";
  quotes[5].text =
    "Вы никогда не пересечете океан, если не наберетесь мужества потерять берег из виду.";
  quotes[6].author = "Генри Форд";
  quotes[6].text =
    "Если вы думаете, что на что-то способны, вы правы; если думаете, что у вас ничего не получится - вы тоже правы.";
  quotes[7].author = "Марк Твен";
  quotes[7].text =
    "Два самых важных дня в твоей жизни: день, когда ты появился на свет, и день, когда понял, зачем.";
  quotes[8].author = "Фрэнк Синатра";
  quotes[8].text = " Лучшая месть – огромный успех.";
  quotes[9].author = "Уоррен Баффет";
  quotes[9].text =
    "Лучше быть уверенным в хорошем результате, чем надеяться на отличный.";
  quotes[10].author = "Вуди Аллен";
  quotes[10].text =
    " 80% успеха - это появиться в нужном месте в нужное время.";
  getQuotes();
  RU.classList.add("myLang");
  EN.classList.remove("myLang");

  getWeather();
});
EN.addEventListener("click", () => {
  lang = "EN";
  document.getElementsByName("yourName")[0].placeholder = "[Enter name]";
  document.getElementsByName("yourCity")[0].placeholder = "Enter your city";
  playerSet.innerHTML = '<input type="checkbox" checked> Player';
  weatherSet.innerHTML = '<input  type="checkbox" checked> Weather';
  timeSet.innerHTML = '<input  type="checkbox" checked> Time';
  dateSet.innerHTML = '<input  type="checkbox" checked> Date';
  greetingSet.innerHTML = '<input  type="checkbox" checked> Greeting';
  quoteSet.innerHTML = '<input type="checkbox" checked> Quote';
  languageSet.innerHTML = "Language:";
  EN.classList.add("myLang");
  RU.classList.remove("myLang");
  quotes[0] = {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall",
    author: "Nelson Mandela",
  };
  quotes[1] = {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  };
  quotes[2] = {
    text: "Spread love everywhere you go. Let no one ever come to you without leaving happier. ",
    author: "Mother Teresa",
  };
  quotes[3] = {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin",
  };
  quotes[4] = {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  };
  quotes[5] = {
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank",
  };
  quotes[6] = {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
  };
  quotes[7] = {
    text: "Not how long, but how well you have lived is the main thing.",
    author: "Seneca",
  };
  quotes[8] = {
    text: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.",
    author: "Henry Ford",
  };
  (quotes[9] = {
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author: "Albert Einstein",
  }),
    (quotes[10] = {
      text: "My mama always said, life is like a box of chocolates. You never know what you're gonna get.",
      author: " Forrest Gump",
    });
  getQuotes();
  getWeather();
});
