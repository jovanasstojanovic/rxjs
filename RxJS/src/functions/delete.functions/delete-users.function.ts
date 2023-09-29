import { Subject, filter, fromEvent, takeUntil } from "rxjs";
import { environmentVariable } from "../../variables/environment-variables/environment-variables";
import { GetUsersFunction } from "../get.functions/get-users.function";
import {
  globalVariableSelectedStyle,
  globalVariableUnselectedStyle,
} from "../../variables/global-variables/global-variables";

export function DeleteUsersFunctions() {
  globalVariableUnselectedStyle.forEach((e) => {
    e = 0;
  });
  globalVariableSelectedStyle.forEach((e) => {
    e = 0;
  });
  const trashButtonElement = document.querySelector("#trash-button");
  fromEvent(trashButtonElement, "click").subscribe((dummy) => {
    DeleteUsersIfTheyExistFunction()
      .then(() => {})
      .catch(() => {});
  });
}

function DeleteUsersIfTheyExistFunction(): Promise<any> {
  const unsubscribeSubject$ = new Subject<void>();

  return new Promise((resolve, reject) => {
    GetUsersFunction()
      .pipe(
        filter((user) => user !== undefined && user !== null),

        takeUntil(unsubscribeSubject$)
      )
      .subscribe((user) => {
        DeleteUsersFromServerFunction(user.id)
          .then(() => {})
          .catch(() => {});
      });
  });
}

function DeleteUsersFromServerFunction(userId: number): Promise<any> {
  const url = `${environmentVariable.baseURL}/users/${userId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          reject("greska");
        }
        resolve(response);
      })
      .catch((error) => reject(error));
  });
}
