import { DataSubmitView } from "./data-submit.component/data-submit.view";
import { ScheduleInputView } from "./schedule-input.component/schedule-input.view";

export async function DataInputView() {
  const dataInputParentContainer = document.createElement("div");
  dataInputParentContainer.style.backgroundColor = "#ffccff";
  dataInputParentContainer.style.borderRadius = "20px";
  dataInputParentContainer.style.padding = "20px";
  dataInputParentContainer.style.paddingLeft = "40px";
  dataInputParentContainer.style.margin = "15px";
  dataInputParentContainer.style.marginTop = "0";
  dataInputParentContainer.style.marginBottom = "4vh";

  const nameInputContainer = document.createElement("div");
  nameInputContainer.style.display = "flex";

  const nameInputLabel = document.createElement("label");
  nameInputLabel.innerHTML = "Your name: ";
  nameInputLabel.style.fontFamily = "'Trebuchet MS', sans-serif";
  nameInputLabel.style.fontSize = "25px";

  const nameInput = document.createElement("input");
  nameInput.style.fontSize = "25px";
  nameInput.style.fontFamily = "'Trebuchet MS', sans-serif";
  nameInput.style.borderRadius = "5px";
  nameInput.style.paddingLeft = "10px";
  nameInput.style.color = "#b300b3";
  nameInput.setAttribute("id", "name-input");

  const helpLabel = document.createElement("label");
  helpLabel.innerHTML = "Help";
  helpLabel.style.marginLeft = "20px";
  helpLabel.style.marginTop = "5px";
  helpLabel.style.fontSize = "20px";
  helpLabel.style.textDecoration = "underline";
  helpLabel.style.cursor = "pointer";
  helpLabel.style.fontFamily = "'Trebuchet MS', sans-serif";

  const helpPopUp = document.createElement("div");
  helpPopUp.innerHTML = "Schedule supports a maximum of 10 users per Date.";
  helpPopUp.style.display = "none";
  helpPopUp.style.backgroundColor = "black";
  helpPopUp.style.opacity = "70%";
  helpPopUp.style.borderTopLeftRadius = "15px";
  helpPopUp.style.borderTopRightRadius = "15px";
  helpPopUp.style.borderBottomRightRadius = "15px";
  helpPopUp.style.color = "white";
  helpPopUp.style.width = "400px";
  helpPopUp.style.marginLeft = "20px";

  helpLabel.addEventListener("mouseover", () => {
    helpLabel.style.color = "black";
    helpPopUp.style.display = "flex";
    helpPopUp.style.flexDirection = "row";
    helpPopUp.style.justifyContent = "center";
    helpPopUp.style.alignItems = "center";
  });

  helpLabel.addEventListener("mouseout", () => {
    helpLabel.style.color = "#b300b3";
    helpPopUp.style.display = "none";
  });

  const scheduleInputContainer = document.createElement("div");
  scheduleInputContainer.style.display = "flex";
  scheduleInputContainer.style.justifyContent = "center";

  document.body.appendChild(dataInputParentContainer);
  nameInputContainer.appendChild(nameInputLabel);
  nameInputContainer.appendChild(nameInput);
  nameInputContainer.appendChild(helpLabel);
  nameInputContainer.appendChild(helpPopUp);
  dataInputParentContainer.appendChild(nameInputContainer);

  scheduleInputContainer.appendChild(ScheduleInputView());
  dataInputParentContainer.appendChild(scheduleInputContainer);
  dataInputParentContainer.appendChild(DataSubmitView());

  const dataInputLineDiv = document.createElement("div");
  dataInputLineDiv.style.width = "100%";
  dataInputLineDiv.style.height = "1px";
  dataInputLineDiv.style.backgroundColor = "#e6e6e6";
  dataInputLineDiv.style.marginBottom = "0.5vh";

  document.body.appendChild(dataInputLineDiv);
}
