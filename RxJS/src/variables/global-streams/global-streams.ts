import {
  Observable,
  Subject,
  from,
  interval,
  map,
  reduce,
  startWith,
  switchMap,
  take,
} from "rxjs";
import { ajax } from "rxjs/ajax";
import { WeatherResponseInterface } from "../../interfaces/weather-response.interface";
import { WeatherDayInterface } from "../../interfaces/weather-day.interface";
import { DaysInterface } from "../../interfaces/days.interface";
import { GetUsersFunction } from "../../functions/get.functions/get-users.function";
import { UserInterface } from "../../interfaces/user.interface";
import {
  globalVariableDay,
  globalVariableDayNameList,
  globalVariableWeatherURL,
} from "../global-variables/global-variables";

// export const weatherDataStream$ = interval(3600000).pipe(
//   switchMap(() =>
//     ajax.getJSON<WeatherResponseInterface>(globalVariableWeatherURL)
//   )
// );

// export const sevenDayForecastStream$ = weatherDataStream$.pipe(
//   map((data) =>
//     data.days.slice(1).map((day: WeatherDayInterface) => ({
//       date: day.datetime,
//       maxTemp: day.tempmax,
//       minTemp: day.tempmin,
//       icon: day.icon,
//     }))
//   )
// );

export const dayNameListStream$ = from(globalVariableDayNameList).pipe(
  map((_, index) => globalVariableDayNameList[(globalVariableDay + index) % 7])
);

export const usersStream$ = GetUsersFunction();

export const daysStream$: Observable<DaysInterface> = usersStream$.pipe(
  take(10),
  map((user) => user.days),
  startWith([0, 0, 0, 0, 0, 0, 0])
);

export const arrayStream$: Subject<number[]> = new Subject<number[]>();

export const userNamesStream$: Observable<string[]> = usersStream$.pipe(
  map((user: UserInterface) => user.name),
  reduce((acc: string[], name: string) => [...acc, name], [])
);

export const userDaysStream$: Observable<number[][]> = usersStream$.pipe(
  map((user) => Object.values(user.days)),
  reduce((acc: number[][], dani) => [...acc, dani], [])
);
