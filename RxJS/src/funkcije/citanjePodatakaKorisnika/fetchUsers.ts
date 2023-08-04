import { Observable } from "rxjs";
import { User } from "../../interfejsi/user";


export function fetchUsers(baseUrl: string): Observable<User> {

  return new Observable((subscriber) => {

    fetch(`${baseUrl}/users`)
      .then((response) => {

        if (!response.ok) {

          throw new Error('Greška prilikom dohvatanja korisnika.');

        }
        return response.json();

      })
      .then((data) => {

        const usersArray = Array.isArray(data) ? data : [data];
        usersArray.forEach((user: User) => subscriber.next(user));
        subscriber.complete();

      })
      .catch((error) => subscriber.error(error));

  });
  
}