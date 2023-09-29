import {
  globalVariableSelectedStyle,
  globalVariableUnselectedStyle,
} from "../../../variables/global-variables/global-variables";
import { ScheduleInputFunctionalities } from "./schedule-input.functionalities";

export function ScheduleInputView(): Element {
  const scheduleInput = document.createElement("div");
  scheduleInput.style.display = "flex";
  scheduleInput.style.flexDirection = "row";
  scheduleInput.style.marginTop = "20px";

  //scheduleInput.style.backgroundColor = "hsl(225, 100%, 90%)";

  for (let i = 0; i < 7; i++) {
    let dayContainerOverlay = document.createElement("div");
    dayContainerOverlay.style.width = "100%";
    dayContainerOverlay.style.height = "100%";
    dayContainerOverlay.style.position = "relative";
    dayContainerOverlay.style.cursor = "pointer";

    let dayContainer = document.createElement("div");
    dayContainer.style.display = "flex";
    dayContainer.style.flexDirection = "column";
    dayContainer.style.alignItems = "stretch";
    dayContainer.style.justifyContent = "stretch";
    dayContainer.style.paddingBottom = "5px";
    dayContainer.style.backgroundColor = "#f2f2f2";
    dayContainer.style.borderRadius = "5px";
    dayContainer.style.width = "10vw";
    dayContainer.style.marginRight = "3px";
    dayContainer.style.marginLeft = "3px";
    dayContainer.style.marginBottom = "15px";
    dayContainer.style.marginTop = "2px";
    dayContainer.style.cursor = "pointer";
    dayContainer.style.pointerEvents = "none";

    let dayInputCheckBox = document.createElement("INPUT");
    dayInputCheckBox.setAttribute("type", "checkbox");
    dayInputCheckBox.setAttribute("id", "day-input-checkbox" + i);
    // dayInputCheckBox.style.height = "25px";
    // dayInputCheckBox.style.padding = "0px";
    // dayInputCheckBox.style.accentColor = "#b300b3";
    dayInputCheckBox.style.cursor = "pointer";
    dayInputCheckBox.style.opacity = "0";

    dayContainerOverlay.addEventListener("click", function () {
      if (globalVariableSelectedStyle[i] == 0) {
        //console.log("if");
        dayContainer.style.border = "2px solid #b300b3";
        dayContainer.style.marginRight = "1px";
        dayContainer.style.marginLeft = "1px";
        dayContainer.style.marginBottom = "13px";
        dayContainer.style.marginTop = "0px";
        globalVariableUnselectedStyle[i] = 1;
      } else {
        //console.log("else");
        dayContainer.style.border = "0px none rgb(0, 0, 0)";
        dayContainer.style.marginRight = "3px";
        dayContainer.style.marginLeft = "3px";
        dayContainer.style.marginBottom = "15px";
        dayContainer.style.marginTop = "2px";
        globalVariableUnselectedStyle[i] = 0;
      }
      dayInputCheckBox.click();
      globalVariableSelectedStyle[i] = globalVariableUnselectedStyle[i];
    });

    dayContainerOverlay.addEventListener("mouseover", function () {
      globalVariableSelectedStyle[i] = globalVariableUnselectedStyle[i];
      dayContainer.style.border = "2px solid #b300b3";
      dayContainer.style.marginRight = "1px";
      dayContainer.style.marginLeft = "1px";
      dayContainer.style.marginBottom = "13px";
      dayContainer.style.marginTop = "0px";
    });

    dayContainerOverlay.addEventListener("mouseout", function () {
      if (globalVariableSelectedStyle[i] == 0) {
        globalVariableSelectedStyle[i] = globalVariableUnselectedStyle[i];
        dayContainer.style.border = "0px none rgb(0, 0, 0)";
        dayContainer.style.marginRight = "3px";
        dayContainer.style.marginLeft = "3px";
        dayContainer.style.marginBottom = "15px";
        dayContainer.style.marginTop = "2px";
      }
    });

    const dayNameContainer = document.createElement("div");
    dayNameContainer.style.display = "flex";
    dayNameContainer.style.flexDirection = "column";
    dayNameContainer.style.alignItems = "center";
    dayNameContainer.style.cursor = "pointer";

    const dayNameLabel = document.createElement("label");
    dayNameLabel.setAttribute("id", "d" + i);
    dayNameLabel.style.fontSize = "20px";
    dayNameLabel.style.fontFamily = "'Trebuchet MS', sans-serif";
    dayNameLabel.style.cursor = "pointer";

    const weatherContainer = document.createElement("div");
    weatherContainer.style.width = "100%";
    weatherContainer.style.display = "flex";
    weatherContainer.style.flexDirection = "column";
    weatherContainer.style.alignItems = "center";
    weatherContainer.style.cursor = "pointer";
    const weatherLabel = document.createElement("label");
    weatherLabel.setAttribute("id", "p" + i);
    weatherLabel.style.fontSize = "20px";
    weatherLabel.style.color = "#b300b3";
    weatherLabel.style.fontFamily = "'Trebuchet MS', sans-serif";
    weatherLabel.style.cursor = "pointer";

    const weatherIcon = document.createElement("img");
    weatherIcon.alt = "";
    weatherIcon.width = 60;
    weatherIcon.height = 60;
    weatherIcon.setAttribute("id", "i" + i);
    weatherIcon.style.cursor = "pointer";

    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(weatherLabel);
    dayContainer.appendChild(weatherContainer);
    dayContainer.appendChild(dayInputCheckBox);
    dayNameContainer.appendChild(dayNameLabel);
    dayContainer.appendChild(dayNameContainer);
    dayContainerOverlay.appendChild(dayContainer);
    scheduleInput.appendChild(dayContainerOverlay);
  }

  setTimeout(() => {
    ScheduleInputFunctionalities();
  }, 100);
  return scheduleInput;
}
