import { DataSubmitFunctionalities } from "./data-submit.functionalities";

export function DataSubmitView(): Element {
  const dataSubmitContainer = document.createElement("div");
  dataSubmitContainer.style.display = "flex";
  dataSubmitContainer.style.justifyContent = "right";
  dataSubmitContainer.style.marginRight = "100px";

  const dataSubmitButton = document.createElement("button");
  dataSubmitButton.innerHTML = "Submit";
  dataSubmitButton.style.fontSize = "20px";
  dataSubmitButton.style.fontFamily = "'Trebuchet MS', sans-serif";
  dataSubmitButton.style.padding = "8px";
  dataSubmitButton.style.paddingRight = "12px";
  dataSubmitButton.style.paddingLeft = "12px";
  dataSubmitButton.style.borderRadius = "10px";
  dataSubmitButton.style.borderColor = "white";
  dataSubmitButton.style.color = "white";
  dataSubmitButton.style.cursor = "pointer";
  dataSubmitButton.style.backgroundColor = "black";
  dataSubmitButton.style.opacity = "50%";
  dataSubmitButton.setAttribute("id", "data-submit-button");

  dataSubmitContainer.appendChild(dataSubmitButton);

  dataSubmitButton.addEventListener("mouseout", () => {
    dataSubmitButton.style.backgroundColor = "black";
    dataSubmitButton.style.opacity = "50%";
  });

  dataSubmitButton.addEventListener("mouseover", () => {
    dataSubmitButton.style.backgroundColor = "#b300b3";
    dataSubmitButton.style.opacity = "1";
  });

  setTimeout(() => {
    DataSubmitFunctionalities();
  }, 100);
  return dataSubmitContainer;
}
