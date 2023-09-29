import { fromEvent, map, switchMap } from "rxjs";
import { globalVariableCombinedResponses } from "../../../variables/global-variables/global-variables";
import { DaysInterface } from "../../../interfaces/days.interface";
import { PostUserFunction } from "../../../functions/post.functions/post-user.function";

export function DataSubmitFunctionalities() {
  const buttonElement = document.querySelector("#data-submit-button");
  const inputElement = document.querySelector(
    "#name-input"
  ) as HTMLInputElement;
  if (buttonElement) {
    fromEvent(buttonElement, "click")
      .pipe(
        map(() => {
          const inputValue = inputElement.value;

          if (!inputValue) {
            let person = prompt("Please enter your name:", "Harry Potter");
            return person;
          }
          return inputValue;
        }),

        switchMap((inputValue) => {
          const daysObjectArray: DaysInterface = {};
          globalVariableCombinedResponses.forEach((value, index) => {
            daysObjectArray[index] = value;
          });
          return PostUserFunction(inputValue, daysObjectArray);
        })
      )
      .subscribe(() => {});
  }
}
