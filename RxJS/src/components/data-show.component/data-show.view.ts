import { globalVariableDay } from "../../variables/global-variables/global-variables";
import { DataShowFunctionalities } from "./data-show.functionalities";

export function DataShowView() {
  const dataShowContainer = document.createElement("div");
  dataShowContainer.style.display = "flex";
  dataShowContainer.style.flexDirection = "row";
  dataShowContainer.style.width = "60%";
  dataShowContainer.style.marginLeft = "20%";

  const dataShowTitleContainer = document.createElement("div");
  dataShowTitleContainer.style.display = "flex";
  dataShowTitleContainer.style.justifyContent = "center";
  dataShowTitleContainer.style.marginBottom = "3vh";

  const dataShowTitleLabel = document.createElement("label");
  dataShowTitleLabel.style.fontFamily = "'Brush Script MT', cursive";
  dataShowTitleLabel.innerHTML = "Schedule";
  dataShowTitleLabel.style.color = "#343434";
  dataShowTitleLabel.style.fontSize = "70px";

  dataShowTitleContainer.appendChild(dataShowTitleLabel);
  document.body.appendChild(dataShowTitleContainer);
  document.body.appendChild(dataShowContainer);

  const letters = ["M", "T", "W", "T", "F", "S", "S"];

  for (let i = 0; i < 7; i++) {
    let dayContainer = document.createElement("div");
    dayContainer.style.border = "3px solid white";
    dayContainer.style.height = "80px";
    dayContainer.style.width = "14%";
    dayContainer.classList.add("day-containers");
    dayContainer.setAttribute("id", "day-container" + i);

    const dayLabel = document.createElement("label");
    dayLabel.innerHTML = letters[(globalVariableDay + i) % 7];
    dayLabel.style.margin = "5px";
    dayLabel.style.fontFamily = "'Trebuchet MS', sans-serif";
    dayLabel.style.fontSize = "25px";

    dayContainer.appendChild(dayLabel);
    dataShowContainer.appendChild(dayContainer);
  }

  setTimeout(() => {
    DataShowFunctionalities();
  }, 100);
}
