import { fromEvent, map, switchMap } from "rxjs";
import { odgovara } from "./unosTermina";
import { Dani } from "../../interfejsi/dani";
import { sendUserDataToServer } from "../../funkcije/kreiranjeNovihKorisnika/sendUserDataToServer";


export function Predaja(input:HTMLInputElement) :Element {

    const div = document.createElement("div");

    const button = document.createElement("button");
    document.body.appendChild(button);
        button.innerHTML = "Submit";
    div.appendChild(button);
        div.style.display = "flex";
        div.style.justifyContent = "right";
        div.style.marginRight = "100px";
        button.style.fontSize =  "25px";
        button.style.fontFamily = "'Trebuchet MS', sans-serif";
        button.style.padding = "8px";
        button.style.paddingRight = "12px";
        button.style.paddingLeft = "12px";
        button.style.borderRadius = "50px";
        button.style.borderColor = "white";
        button.style.color = "white";
        button.style.cursor = "pointer";
        button.style.backgroundColor = "black";
        button.style.opacity = "50%";

        button.addEventListener('mouseout', () => {

          button.style.backgroundColor = "black";
          button.style.opacity = "50%";

        });
  
        button.addEventListener('mouseover', () => {

          button.style.backgroundColor = "#b300b3";
          button.style.opacity = "1";

        });
         
         const click$ = fromEvent(button, 'click').pipe(

          map(() => {

            const inputValue = input.value;
            if (!inputValue) {

              let person = prompt('Please enter your name:', 'Harry Potter');
              return person;

            }
            return inputValue;

          }),
          switchMap((inputValue) => {

            const daniObj: Dani = {};
            odgovara.forEach((value, index) => {

              daniObj[index] = value;

            });
            console.log(inputValue, daniObj);
            return sendUserDataToServer(inputValue, daniObj);
            
          })
        ).subscribe(
          (result) => {

            console.log(result);
            
          }
        );
    return div;
}

