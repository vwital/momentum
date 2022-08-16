//Время
const time = document.querySelector(".time");
const myDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const body = document.querySelector("body");
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
