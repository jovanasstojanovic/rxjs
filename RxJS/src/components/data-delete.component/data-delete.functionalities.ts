import { zip } from "rxjs";
import {
  userDaysStream$,
  userNamesStream$,
} from "../../variables/global-streams/global-streams";
import {
  DataDeleteViewDynamic,
  DataDeleteViewDynamicButton,
} from "./data-delete.view";
import { DeleteUsersFunctions } from "../../functions/delete.functions/delete-users.function";

export function DataDeleteFunctionalities() {
  zip(userNamesStream$, userDaysStream$).subscribe(([allNames, days]) => {
    let counter = -1;
    allNames.forEach((name, index) => {
      if (index < 10) {
        counter = index;

        if (counter == 0) DataDeleteViewDynamicButton();
        DataDeleteViewDynamic(name);
        const deleteElement = document.querySelector(`#dynamic-label${index}`);
        days[index].forEach((element, index2) => {
          if (element > 0) {
            const scheduleCellElement = document.querySelector(
              `#day-container${index2}`
            ) as HTMLElement;
            const color = scheduleCellElement.style.backgroundColor;
            deleteElement.addEventListener("mouseover", () => {
              scheduleCellElement.style.backgroundColor = "hsl(225, 100%, 80%)";
            });
            deleteElement.addEventListener("mouseout", () => {
              scheduleCellElement.style.backgroundColor = color;
            });
          }
        });
      }
    });

    if (counter >= 0) {
      DeleteUsersFunctions();
    }
  });
}
