const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition = [];
let currentTime = 30;
let timerId = null;

// Monty (mole) movement
function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  hitPosition.push(randomSquare.id);
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (hitPosition.includes(square.id)) {
      result++;
      score.textContent = result;
      hitPosition = [];
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

moveMole();

// Timer for game window
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Time's Up! You smacked Monty this many times, " + result);
    window.location = "./index.html";
  }
}

let countDownTimerId = setInterval(countDown, 1000);

// Hammer function for player
const cursor = document.querySelector("#hammer");
const whack = document.querySelector("#boing");

const soundPlayer = new Audio("./boing.mp3");

function followCursor(e) {
  cursor.style.top = e.clientY + window.scrollY + "px";
  cursor.style.left = e.clientX + "px";
}

function snap() {
  cursor.classList.add("snap");
  soundPlayer.play();

  setTimeout(() => {
    cursor.classList.remove("snap");
    soundPlayer.currentTime = 0;
  }, 100);
}
window.addEventListener("mousemove", followCursor);
window.addEventListener("click", snap);
