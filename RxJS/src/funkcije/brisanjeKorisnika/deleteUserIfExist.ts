import { Subject, filter, takeUntil } from "rxjs";
import { fetchUsers } from "../citanjePodatakaKorisnika/fetchUsers";
import { deleteUserFromServer } from "./deleteUserFromServer";



export function deleteUsersIfExist(baseUrl: string): Promise<any> {

  const unsubscribeSubject$ = new Subject<void>();
  
  return new Promise((resolve, reject) => {

    fetchUsers(baseUrl)
      .pipe(

        filter((user) => user !== undefined && user !== null), 
        takeUntil(unsubscribeSubject$)

      )
      .subscribe(

        (user) => {

          deleteUserFromServer(user.id,baseUrl).then(() => {

            console.log(`Korisnik ${user.ime} je obrisan.`);

          })
          .catch((error) => {

            console.error(`Greška prilikom brisanja korisnika ${user.ime}:`, error);

          });
          console.log(user);

        }

      );

  });
  
}