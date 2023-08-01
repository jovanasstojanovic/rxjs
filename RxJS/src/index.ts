import { Observable, Subject, Subscription, combineLatest, debounceTime, filter, forkJoin, from, fromEvent, interval, map, merge, of, pairwise, pluck, range, reduce, sampleTime, scan, startWith, switchMap, take, takeUntil, tap, zip } from "rxjs";
import { Dani, User } from "./user";

//         debounceTime(500)





let odgovara=[0,0,0,0,0,0,0];

const date=new Date();
let day=date.getDay();

function unosTermina():Element
{
    let nizDana=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  

   
   

    const termini=document.createElement("div");
        termini.style.display="flex";
        termini.style.flexDirection="row";

    for(let i=0;i<7;i++)
    {
        let dan=document.createElement("div");
            dan.style.display="flex";
            dan.style.flexDirection="column";
            dan.style.margin="17px";

        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
            x.style.height="25px";
            x.style.accentColor="#b300b3";
            x.style.cursor="pointer";
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

        const kojiDan=document.createElement("label");
            kojiDan.innerHTML=nizDana[day];
            kojiDan.style.fontSize="23px";
            kojiDan.style.fontFamily="'Trebuchet MS', sans-serif";
        dan.appendChild(kojiDan);
        termini.appendChild(dan);
        
        day++;
        if(day==7) day=0;
    }
        termini.style.marginTop="20px";
    
    return termini;
    //document.body.appendChild(termini);
}


function Predaja(input:HTMLInputElement):Element{
    const div=document.createElement("div");

    const button=document.createElement("button");
    document.body.appendChild(button);
        button.innerHTML="Submit";
    div.appendChild(button);
        div.style.display="flex";
        div.style.justifyContent="right";
        div.style.marginRight="100px";
        button.style.fontSize="25px";
        button.style.fontFamily="'Trebuchet MS', sans-serif";
        button.style.padding="8px";
        button.style.paddingRight="12px";
        button.style.paddingLeft="12px";
        button.style.borderRadius="50px";
        button.style.borderColor="white";
        button.style.color="white";
        button.style.cursor="pointer";
        button.style.backgroundColor="#b300b3";

         
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
            return sendUserDataToServer(inputValue, daniObj); // Ovde koristimo return kako bismo poslali rezultat sendUserDataToServer funkcije
          })
        ).subscribe(
          (result) => {
            console.log(result);
          }
        );
    return div;
}

function sendUserDataToServer(inputValue: string, dani:Dani): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ime: inputValue, dani: dani })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Greška prilikom slanja podataka na server.');
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }



//////////////////////////////////////////////

const baseUrl = 'http://localhost:3000';


function fetchUsers(baseUrl: string): Observable<User> {
  return new Observable((subscriber) => {
    fetch(`${baseUrl}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Greška prilikom dohvatanja korisnika.');
        }
        return response.json();
      })
      .then((data) => {
        // Ako podaci nisu niz korisnika, već samo jedan korisnik, pretvaramo ga u niz kako bismo lakše rukovali sa njim.
        const usersArray = Array.isArray(data) ? data : [data];

        // Emitujemo svakog korisnika pojedinačno u okviru niza
        usersArray.forEach((user: User) => subscriber.next(user));

        // Kada smo završili sa emitovanjem korisnika, zatvaramo stream
        subscriber.complete();
      })
      .catch((error) => subscriber.error(error));
  });
}

const users$ = fetchUsers(baseUrl);

const names$ = users$.pipe(
  map((user: User) => user.ime),
  reduce((acc: string[], name: string) => [...acc, name], []) // Inicijalni akumulator je prazan niz []
  );


  function lista(){
    const listaImena=document.createElement("div");
    listaImena.style.width="100%";
    listaImena.style.marginTop="10px";
    listaImena.style.display="flex";
    listaImena.style.flexDirection="row-reverse";
    listaImena.style.flexWrap="wrap";
    names$.subscribe((allNames: string[]) => {
      console.log(allNames);
      allNames.forEach((ime)=>{
        const jedno=document.createElement("label");
        jedno.style.fontSize="30px";
        jedno.style.margin="20px";
        jedno.style.fontFamily="'Brush Script MT', cursive";
        jedno.style.color="#343434";
        jedno.innerHTML="• "+ime;
        listaImena.appendChild(jedno);
      })
    });
    const linija=document.createElement("div");
    linija.style.width="100%";
    linija.style.height="1px";
    linija.style.backgroundColor="#e6e6e6";
    linija.style.marginTop="50px";
    document.body.appendChild(linija);
    document.body.appendChild(listaImena);
  }
  

let niz=[0,0,0,0,0,0,0];

users$.pipe(take(10)).subscribe((user: User) => {
  console.log(user);
});

const dani$: Observable<Dani> = users$.pipe(
  take(10),
  map((dani) => dani.dani)
);


const niz$: Subject<number[]> = new Subject<number[]>();
dani$.subscribe((dani) => {
  niz$.next([...niz]);
  console.log(dani);
  Object.values(dani).forEach((value, index) => {
    //niz[index] += value;
  });

  console.log(niz);
});
///////////////////////////////////////////////

function ime()
{
    const containerPodaci=document.createElement("div");
        containerPodaci.style.backgroundColor="#ffccff";//hsl(300, 100%, 90%)
        containerPodaci.style.borderRadius="50px";
        containerPodaci.style.padding="20px";
        containerPodaci.style.paddingLeft="40px";
        containerPodaci.style.margin="15px";
        containerPodaci.style.marginTop="0px";

    const manji=document.createElement("div");
    document.body.appendChild(containerPodaci);
  manji.style.display="flex";
    //ime mozda ne treba ??
    const labela=document.createElement("label");
    //labela.style.marginTop="5px";
        labela.innerHTML="Your name: ";
        labela.style.fontFamily="'Trebuchet MS', sans-serif";
        labela.style.fontSize="25px";
    manji.appendChild(labela);

    const unosImena=document.createElement("input");
        unosImena.style.fontSize="25px";
        unosImena.style.fontFamily="'Trebuchet MS', sans-serif";
        unosImena.style.borderRadius="50px";
        unosImena.style.paddingLeft="10px";
        unosImena.style.color="#b300b3";
        const help=document.createElement("label");
      help.innerHTML="Help";
      
      help.style.marginLeft="20px";
      help.style.marginTop="5px";
      help.style.fontSize="20px";
      help.style.textDecoration="underline";
      help.style.cursor="pointer";
      help.addEventListener('mouseover', () => {
        help.style.color = 'black';
        popup.style.display="flex";
        popup.style.flexDirection="row";
        popup.style.justifyContent="center";
        popup.style.alignItems="center";
      });

      help.addEventListener('mouseout', () => {
        help.style.color = '#b300b3';
        popup.style.display="none";
      });


        help.style.fontFamily="'Trebuchet MS', sans-serif";

        const popup=document.createElement("div");
        popup.innerHTML="Schedule supports a maximum of 10 users per Date and lasts until tomorrow.";
        popup.style.display="none";
        popup.style.backgroundColor="black";
        
        popup.style.opacity="70%";
        popup.style.borderTopLeftRadius="15px";
        popup.style.borderTopRightRadius="15px";
        popup.style.borderBottomRightRadius="15px";
        popup.style.color="white";
        popup.style.width="520px";
        popup.style.marginLeft="20px";
      manji.appendChild(unosImena);

  manji.appendChild(help);
  manji.appendChild(popup);
    
    containerPodaci.appendChild(manji);
    
    const termini=document.createElement("div");
    termini.appendChild(unosTermina());
        termini.style.display="flex";
        termini.style.justifyContent="center";

    containerPodaci.appendChild(termini);

    containerPodaci.appendChild(Predaja(unosImena));
    containerPodaci.style.marginBottom="30px";
    const linija=document.createElement("div");
    linija.style.width="100%";
    linija.style.height="1px";
    linija.style.backgroundColor="#e6e6e6";
    linija.style.marginBottom="20px";
    document.body.appendChild(linija);
    const tabelica=document.createElement("div");
    tabelica.style.display="flex";
    tabelica.style.flexDirection="row";
    tabelica.style.width="60%";
    tabelica.style.marginLeft="20%";
    const naslov=document.createElement("div");
    const raspored=document.createElement("label");
    naslov.style.display="flex";
    
    naslov.style.justifyContent="center";
    naslov.style.marginBottom="10px";
    naslov.appendChild(raspored);
    raspored.style.fontFamily="'Brush Script MT', cursive";
    raspored.innerHTML="Schedule";
    raspored.style.color="#343434";
    //raspored.style.borderBottom="2px solid black";
    raspored.style.fontSize="70px";
    document.body.appendChild(naslov);

    document.body.appendChild(tabelica);
    tabela(tabelica);
    lista();
}
ime();
///////////////////////////////////////////////////

function tabela(container:HTMLDivElement){
  const slova=["M","T","W","T","F","S","S"];
  for (let i = 0; i < 7; i++) {
    let dan = document.createElement("div");
    dan.style.border="3px solid white";
    dan.style.height="80px";
    dan.style.width="14%";
    const labela=document.createElement("label");
            labela.innerHTML=slova[(day+i)%7];
            labela.style.margin="5px";
            labela.style.fontFamily="'Trebuchet MS', sans-serif";
            labela.style.fontSize="25px";
            dan.appendChild(labela);
    dan.classList.add("dan-div");
    container.appendChild(dan);
  }
  combineLatest([niz$, dani$]).pipe(
    tap(([niz, dani]) => {
      niz.forEach((value, index) => {
        niz[index] += dani[index];
      });
  
      console.log(niz);
      
        const divs = document.querySelectorAll(".dan-div");
        divs.forEach((div:HTMLDivElement, index) => {
          if (niz[index] >0) {
            let val=100-7*niz[index];
            
            div.style.backgroundColor = "hsl(300, 100%, "+val+"%)"; // Ako je odgovara[index] 1, postavi boju na zelenu
            //boja za preko odredjenog broja
          } else {
            div.style.backgroundColor = "#e6e6e6"; // Inače, postavi boju na crvenu
          }
        });
      
    })
  ).subscribe();
}

