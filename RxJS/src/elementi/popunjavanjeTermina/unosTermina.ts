import { fromEvent, map } from "rxjs";


export let odgovara=[0,0,0,0,0,0,0];

const date=new Date();
export let day=date.getDay();

export function unosTermina():Element{

    let nizDana = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  
    const termini = document.createElement("div");
        termini.style.display = "flex";
        termini.style.flexDirection = "row";

    for(let i = 0; i < 7; i++)
    {

        let dan = document.createElement("div");
            dan.style.display = "flex";
            dan.style.flexDirection = "column";
            dan.style.margin = "17px";

        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
            x.style.height = "25px";
            x.style.accentColor = "#b300b3";
            x.style.cursor = "pointer";
        dan.appendChild(x);

        const checked$=fromEvent(x, "click");
                    checked$.pipe(

                        map((event) => {

                          const checkbox = event.target as HTMLInputElement;
                          return checkbox.checked ? 1 : 0;

                        })

                      ).subscribe((value) => {

                        odgovara[i] = value;
                        console.log(odgovara); 

                      });

        const kojiDan = document.createElement("label");
            kojiDan.innerHTML = nizDana[day];
            kojiDan.style.fontSize = "23px";
            kojiDan.style.fontFamily = "'Trebuchet MS', sans-serif";
        dan.appendChild(kojiDan);
        termini.appendChild(dan);
        
        day++;
        if(day == 7) day =  0;

    }
        termini.style.marginTop = "20px";
    
    return termini;
    
}