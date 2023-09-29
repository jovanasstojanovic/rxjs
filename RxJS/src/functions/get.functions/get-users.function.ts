import { Observable } from "rxjs";
import { UserInterface } from "../../interfaces/user.interface";
import { environmentVariable } from "../../variables/environment-variables/environment-variables";

export function GetUsersFunction(): Observable<UserInterface> {
  return new Observable((subscriber) => {
    fetch(`${environmentVariable.baseURL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Greška prilikom dohvatanja korisnika.");
        }
        return response.json();
      })
      .then((data) => {
        const usersArray = Array.isArray(data) ? data : [data];
        usersArray.forEach((user: UserInterface) => subscriber.next(user));
        subscriber.complete();
      })
      .catch((error) => subscriber.error(error));
  });
}
