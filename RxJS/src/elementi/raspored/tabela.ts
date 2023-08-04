import { Observable, Subject, combineLatest, map, take, tap } from "rxjs";
import { day } from "../popunjavanjeTermina/unosTermina";
import { users$ } from "./lista";
import { Dani } from "../../interfejsi/dani";


let niz = [0,0,0,0,0,0,0];

const dani$: Observable<Dani> = users$.pipe(

  take(10),
  map((dani) => dani.dani)

);
  

const niz$: Subject<number[]> = new Subject<number[]>(); 
dani$.subscribe((dani) => {

  niz$.next([...niz]);
  console.log(dani);
  console.log(niz);

});

export function tabela(container: HTMLDivElement) {

    const slova = ["M","T","W","T","F","S","S"];
    for (let i = 0; i < 7; i++) {

      let dan = document.createElement("div");
              dan.style.border = "3px solid white";
              dan.style.height = "80px";
              dan.style.width = "14%";

      const labela = document.createElement("label");
              labela.innerHTML = slova[(day + i) % 7];
              labela.style.margin = "5px";
              labela.style.fontFamily = "'Trebuchet MS', sans-serif";
              labela.style.fontSize = "25px";

        dan.appendChild(labela);
              dan.classList.add("dan-div");

        container.appendChild(dan);

    }

    combineLatest([niz$, dani$]).pipe(

      tap(([niz, dani]) => {

        niz.forEach((value, index) => {

          niz[index] += dani[index];

        });
        
        const divs = document.querySelectorAll(".dan-div");
        
        divs.forEach((div:HTMLDivElement, index) => {

          if (niz[index] > 0) {

            let val1 = 100 - 10 * niz[index];
                    div.style.backgroundColor = "hsl(300, 100%, " + val1 + "%)"; 

          } else {

                    div.style.backgroundColor = "#e6e6e6";

          }

        });
        
      })
  ).subscribe();   

}