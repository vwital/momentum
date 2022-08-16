//Время
const time = document.querySelector(".time");
const myDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
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
