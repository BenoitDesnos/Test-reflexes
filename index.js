const clickEvent1 = document.querySelector(".click-event1");
const clickEvent2 = document.querySelector(".click-event2");
const instructionGenerator = document.getElementById("instruction");
const endEvent = document.querySelector(".box-parent");
const restartButton = document.querySelector(".wrapper");
const gridItem1 = document.querySelector(".grid-item-1");
const gridItem2 = document.querySelector(".grid-item-2");
const gridItem3 = document.querySelector(".grid-item-3");
const gridItem4 = document.querySelector(".grid-item-4");
const gridItem5 = document.querySelector(".grid-item-5");
const gridItemAverage = document.querySelector(".grid-item-average");

let randomGenerator = 0;
let firstTimeStamp = 0;
let secondTimeStamp = 0;
let attempt = 0;
let myTimeOut = " ";
let totalReflex = 0;

function greenDisplay() {
  document.querySelector(".click-event2").style.backgroundColor =
    "rgb(75, 219, 106)";
  clickEvent2.innerHTML = "<p>Allez et que ça saute ! </p>";
}

function Click1(e) {
  firstTimeStamp = e.timeStamp;
  randomGenerator = Math.random() * 2500 + 1500;
  document.querySelector(".click-event2").style.backgroundColor =
    "rgb(206, 38, 54)";
  clickEvent2.innerHTML = "<p>Attention...</p>";
  document.querySelector(".click-event2").style.zIndex = "2";
  document.querySelector(".click-event1").style.zIndex = "-1";
  myTimeOut = setTimeout(greenDisplay, randomGenerator);
}

function Click2(e) {
  secondTimeStamp = e.timeStamp;
  calculReflex = secondTimeStamp - firstTimeStamp - randomGenerator;
  roundedString = calculReflex.toFixed(2);
  reflexRounded = Number(roundedString);
  if (randomGenerator + firstTimeStamp < secondTimeStamp && attempt < 5) {
    document.querySelector(".success-event").style.backgroundColor =
      "rgb(68, 142, 211)";
    instructionGenerator.innerHTML = `${reflexRounded} ms`;
    document.querySelector(".click-event1").style.zIndex = "3";
    totalReflex = totalReflex + reflexRounded;
    let AverageReflex = totalReflex / 5;
    AverageReflexRounded = AverageReflex.toFixed(2);
    attempt++;

    switch (attempt) {
      case 1:
        gridItem1.textContent = `${reflexRounded} ms`;
        break;
      case 2:
        gridItem2.textContent = `${reflexRounded} ms`;
        break;
      case 3:
        gridItem3.textContent = `${reflexRounded} ms`;
        break;
      case 4:
        gridItem4.textContent = `${reflexRounded} ms`;
        break;
      case 5:
        gridItem5.textContent = `${reflexRounded} ms`;
        gridItemAverage.textContent = `${AverageReflexRounded} ms`;
        break;
    }
  } else {
    document.querySelector(".fail-event").style.backgroundColor =
      "rgb(68, 142, 211)";
    instructionGenerator.textContent = "Trop tot !!  Click pour recommencer";
    document.querySelector(".click-event1").style.zIndex = "3";
    clearTimeout(myTimeOut);
  }

  if (attempt > 4) {
    document.querySelector(".success-event").style.backgroundColor =
      "rgb(68, 142, 211)";
    instructionGenerator.textContent = ` Votre temps de réaction moyen est de : ${AverageReflexRounded} ms.`;
    restartButton.style.display = "flex";
    document.querySelector(".click-event1").style.zIndex = "3";
    clickEvent1.removeEventListener("click", Click1);
    endEvent.style.cursor = "default";
    restartButton.addEventListener("click", gameRestart);
    attempt = 0;
  }
}

function gameRestart(e) {
  totalReflex = 0;
  instructionGenerator.textContent = "Cliquez pour tester vos reflexes !";
  restartButton.style.display = "none";
  endEvent.style.cursor = "pointer";
  e.stopPropagation();
  clickEvent1.addEventListener("click", Click1);
  gridItem1.textContent = ``;
  gridItem2.textContent = ``;
  gridItem3.textContent = ``;
  gridItem4.textContent = ``;
  gridItem5.textContent = ``;
  gridItemAverage.textContent = ``;
  return;
}

function reflexeTest() {}
clickEvent1.addEventListener("click", Click1);
clickEvent2.addEventListener("click", Click2);
reflexeTest();
