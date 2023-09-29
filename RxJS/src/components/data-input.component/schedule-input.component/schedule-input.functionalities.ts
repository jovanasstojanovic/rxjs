import {
  Observable,
  combineLatest,
  concatAll,
  fromEvent,
  interval,
  map,
  mergeMap,
  startWith,
  switchMap,
  zip,
} from "rxjs";
import {
  globalVariableCombinedResponses,
  globalVariableDay,
  globalVariableWeatherURL,
} from "../../../variables/global-variables/global-variables";
import { dayNameListStream$ } from "../../../variables/global-streams/global-streams";
import { ajax } from "rxjs/ajax";
import { WeatherResponseInterface } from "../../../interfaces/weather-response.interface";
import { WeatherDayInterface } from "../../../interfaces/weather-day.interface";

const apiUrl = globalVariableWeatherURL; // Zamijenite sa svojim URL-om

interface WeatherData {
  app_max_temp: number;
  app_min_temp: number;
  datetime: string;
  weather: {
    icon: string;
  };
}
// Funkcija za dohvat podataka sa API-ja koristeći AJAX
function fetchDataFromApi(): Observable<WeatherResponseInterface> {
  console.log("oj");
  return new Observable<WeatherResponseInterface>((observer) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);

    console.log("oj");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          observer.next(response);
          observer.complete();
        } else {
          observer.error(
            "Greška pri dohvatanju podataka. Status koda: " + xhr.status
          );
        }
      }
    };

    xhr.send();
  });
}

// Funkcija koja će se pozivati na svakih sat vremena
function fetchDataEveryHour(): Observable<WeatherData[]> {
  // Interval na svakih sat vremena (3600000 ms = 1 sat)
  return interval(3600000).pipe(
    startWith(0), // Emituje 0 odmah nakon pretplate
    mergeMap(() => fetchDataFromApi()),
    map((data: any) => {
      // Mapirajte podatke u željeni format
      return data.data.slice(-7);
    })
  );
}

const dataStream$: Observable<WeatherData[]> = fetchDataEveryHour().pipe(
  map((data: WeatherData[]) => data.slice(-7)) // Ovde koristimo slice za dobijanje poslednjih 7 elemenata
);

const mappedStream$: Observable<any> = dataStream$.pipe(
  map((data: any[]) =>
    data.map((item) => ({
      app_max_temp: item.app_max_temp,
      app_min_temp: item.app_min_temp,
      datetime: item.datetime,
      weather_icon: item.weather.icon,
    }))
  ),
  concatAll()
);
mappedStream$.subscribe((data) => {
  console.log(data);
});

export function ScheduleInputFunctionalities() {
  let dayNumberLocalVariable = globalVariableDay;
  for (let i = 0; i < 7; i++) {
    const dayInputCheckBoxFromTheView = document.querySelector(
      `#day-input-checkbox${i}`
    );
    if (dayInputCheckBoxFromTheView) {
      const checkedInputCheckBoxLocalStream$ = fromEvent(
        dayInputCheckBoxFromTheView,
        "click"
      );
      checkedInputCheckBoxLocalStream$
        .pipe(
          map((event) => {
            const checkbox = event.target as HTMLInputElement;
            return checkbox.checked ? 1 : 0;
          })
        )
        .subscribe((value) => {
          globalVariableCombinedResponses[i] = value;
        });
    }

    dayNumberLocalVariable++;
    if (dayNumberLocalVariable == 7) dayNumberLocalVariable = 0;
  }

  let i = 0;
  dayNameListStream$.subscribe((data) => {
    console.log(data);
  });
  const combined$ = zip(dayNameListStream$, mappedStream$);
  combined$.subscribe(([dan, weather]) => {
    const dayNameElement = document.querySelector(`#d${i}`);
    dayNameElement.innerHTML = dan;
    const weatherDataElement = document.querySelector(`#p${i}`);
    weatherDataElement.innerHTML = weather.app_max_temp + "°C";
    const weatherIconElement = document.querySelector(
      `#i${i}`
    ) as HTMLImageElement;
    weatherIconElement.src = `../../../galery/weather-icons/${weather.weather_icon}.png`;
    i++;
  });
}
