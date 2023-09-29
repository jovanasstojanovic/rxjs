import { globalValueNameCounter } from "../../variables/global-variables/global-variables";
import { DataDeleteFunctionalities } from "./data-delete.functionalities";

let localVariableNameCounter = globalValueNameCounter;

export function DataDeleteView() {
  const dataDeleteContainer = document.createElement("div");
  dataDeleteContainer.style.width = "100%";
  dataDeleteContainer.style.marginTop = "5px";
  dataDeleteContainer.style.display = "flex";
  dataDeleteContainer.style.flexDirection = "row-reverse";
  dataDeleteContainer.style.flexWrap = "wrap";

  const dataDeleteDynamicContainer = document.createElement("div");
  dataDeleteDynamicContainer.style.width = "100%";
  dataDeleteDynamicContainer.style.height = "100%";
  dataDeleteDynamicContainer.style.display = "flex";
  dataDeleteDynamicContainer.style.flexDirection = "row-reverse";
  dataDeleteDynamicContainer.style.flexWrap = "wrap";
  dataDeleteDynamicContainer.setAttribute(
    "id",
    "data-delete-dynamic-container"
  );

  dataDeleteContainer.appendChild(dataDeleteDynamicContainer);

  const dataDeleteLineContainer = document.createElement("div");
  dataDeleteLineContainer.style.width = "100%";
  dataDeleteLineContainer.style.height = "1px";
  dataDeleteLineContainer.style.backgroundColor = "#e6e6e6";
  dataDeleteLineContainer.style.marginTop = "20px";

  document.body.appendChild(dataDeleteLineContainer);
  document.body.appendChild(dataDeleteContainer);
  setTimeout(() => {
    DataDeleteFunctionalities();
  }, 100);
}

export function DataDeleteViewDynamic(name: string) {
  const dynamicLabel = document.createElement("label");
  dynamicLabel.style.fontSize = "30px";
  dynamicLabel.style.margin = "20px";
  dynamicLabel.style.fontFamily = "'Brush Script MT', cursive";
  dynamicLabel.style.color = "#343434";
  dynamicLabel.innerHTML = "• " + name;
  dynamicLabel.setAttribute("id", "dynamic-label" + localVariableNameCounter);

  localVariableNameCounter++;

  const dynamicContainer = document.querySelector(
    "#data-delete-dynamic-container"
  );

  dynamicContainer.appendChild(dynamicLabel);
}

export function DataDeleteViewDynamicButton() {
  const buttonIconImg = document.createElement("img");
  buttonIconImg.src = "../../galery/trash.png";
  buttonIconImg.style.cursor = "pointer";
  buttonIconImg.style.width = "50px";
  buttonIconImg.style.height = "50px";
  buttonIconImg.style.marginTop = "1vh";
  buttonIconImg.style.opacity = "0.7";
  buttonIconImg.setAttribute("id", "trash-button");

  buttonIconImg.addEventListener("mouseover", () => {
    buttonIconImg.style.opacity = "1";
  });

  buttonIconImg.addEventListener("mouseout", () => {
    buttonIconImg.style.opacity = "0.7";
  });

  const dynamicContainer = document.querySelector(
    "#data-delete-dynamic-container"
  );

  dynamicContainer.appendChild(buttonIconImg);
}
