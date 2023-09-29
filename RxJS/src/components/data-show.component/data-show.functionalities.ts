import { combineLatest, merge, tap } from "rxjs";
import {
  arrayStream$,
  daysStream$,
} from "../../variables/global-streams/global-streams";
import { globalVariableArray } from "../../variables/global-variables/global-variables";

export function DataShowFunctionalities() {
  merge(daysStream$)
    .pipe(
      tap(() => {
        arrayStream$.next([...globalVariableArray]);
      })
    )
    .subscribe();

  combineLatest([arrayStream$, daysStream$])
    .pipe(
      tap(([array, days]) => {
        //console.log(days);
        array.forEach((value, index) => {
          array[index] += days[index];
        });
        const divs = document.querySelectorAll(".day-containers");

        divs.forEach((div: HTMLDivElement, index) => {
          if (array[index] > 0) {
            let value = 100 - 10 * array[index];

            div.style.backgroundColor = "hsl(300, 100%, " + value + "%)";
          } else {
            div.style.backgroundColor = "#e6e6e6";
          }
        });
      })
    )
    .subscribe();
}
