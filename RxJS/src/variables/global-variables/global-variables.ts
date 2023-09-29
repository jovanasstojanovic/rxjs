import { environmentVariable } from "../environment-variables/environment-variables";

export const globalVariableDate = new Date();
export let globalVariableDay = globalVariableDate.getDay();
export let globalVariableCombinedResponses = [0, 0, 0, 0, 0, 0, 0]; //44.32938802776602, 21.842179953977833;
export const globalVariableWeatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=%2043.3247200&lon=21.9033300&days=8&key=1728fc9df94d40cbbdf36e4c715638d8`;
export const globalVariableDayNameList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export let globalVariableArray = [0, 0, 0, 0, 0, 0, 0];
export let globalValueNameCounter = 0;
export let globalVariableSelectedStyle: number[] = [0, 0, 0, 0, 0, 0, 0];
export let globalVariableUnselectedStyle: number[] = [0, 0, 0, 0, 0, 0, 0];
