const blueDisplay = document.querySelector(".click-event1");
const awaitDisplay = document.querySelector(".click-event2");
const instructionGenerator = document.getElementById("instruction");
const endEvent = document.querySelector(".box-parent");
const restartButton = document.querySelector(".wrapper");
const results = document.querySelectorAll(".results");
const resultsAverage = document.querySelector(".results-average");

let randomGenerator = 0;
let firstTimeStamp = 0;
let secondTimeStamp = 0;
let attempt = 0;
let myTimeOut = " ";
let totalReflex = 0;
let resultsArray = [];
let isTooEarly = 90;

function greenDisplay() {
  awaitDisplay.style.backgroundColor = "rgb(75, 219, 106)";
  awaitDisplay.innerHTML = "<p>Allez et que ça saute ! </p>";
  awaitDisplay.style.zIndex = "2";
}
function redDisplay() {
  awaitDisplay.style.backgroundColor = "rgb(206, 38, 54)";
  awaitDisplay.innerHTML = "<p>Attention...</p>";
  awaitDisplay.style.zIndex = "2";
}
function Click1(e) {
  firstTimeStamp = e.timeStamp;
  randomGenerator = Math.random() * 3500 + 1500;
  redDisplay();
  blueDisplay.style.zIndex = "-1";
  myTimeOut = setTimeout(greenDisplay, randomGenerator);
}
function Click2(e) {
  secondTimeStamp = e.timeStamp;
  calculResult = secondTimeStamp - firstTimeStamp - randomGenerator;
  resultRounded = Number(calculResult.toFixed(2));
  if (resultRounded > isTooEarly && attempt < 5) {
    instructionGenerator.innerHTML = `${resultRounded} ms`;
    blueDisplay.style.zIndex = "3";
    redDisplay();
    totalReflex += resultRounded;
    let averageReflex = totalReflex / 5;
    averageResultRounded = averageReflex.toFixed(2);
    attempt++;
    resultsArray.push(resultRounded);

    for (let i = 0; i < results.length; i++) {
      results[i].textContent = `${resultsArray[i]} ms`;
      if (resultsArray[i] === undefined) {
        return (results[i].textContent = "");
      }
      if (resultsArray.length === results.length) {
        resultsAverage.textContent = `${averageResultRounded} ms`;
      }
    }
  } else {
    instructionGenerator.textContent = "Trop tot !!  Click pour recommencer";
    blueDisplay.style.zIndex = "3";
    clearTimeout(myTimeOut);
  }

  if (attempt > 4) {
    instructionGenerator.textContent = ` Votre temps de réaction moyen est de : ${averageResultRounded} ms.`;
    restartButton.style.display = "flex";
    endEvent.style.cursor = "default";
    blueDisplay.style.zIndex = "3";
    blueDisplay.removeEventListener("mousedown", Click1);
    restartButton.addEventListener("mousedown", gameRestart);
    attempt = 0;
  }
}
function gameRestart(e) {
  totalReflex = 0;
  instructionGenerator.textContent = "Cliquez pour tester vos reflexes !";
  restartButton.style.display = "none";
  endEvent.style.cursor = "pointer";
  e.stopPropagation();
  blueDisplay.addEventListener("mousedown", Click1);
  results.forEach((result) => {
    result.textContent = ``;
  });
  resultsAverage.textContent = ``;
  resultsArray = [];
  return;
}
blueDisplay.addEventListener("mousedown", Click1);
awaitDisplay.addEventListener("mousedown", Click2);
/* test */
