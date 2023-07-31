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
            kojiDan.style.fontSize="25px";
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

//mozda treba dugme samo da pamti ime, a ono sto se stiklira da daje priview ?
// DAAA DODATI PREVIEW, ili neki realtime info o tome koliko osoba je stikliralo taj dan takodje-to je bolje
//ili da budu crveni dani koji nikome do sada nisu odgovarali
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

    //ime mozda ne treba ??
    const labela=document.createElement("label");
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

    manji.appendChild(unosImena);
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
            let val=100-8*niz[index];
            
            div.style.backgroundColor = "hsl(300, 100%, "+val+"%)"; // Ako je odgovara[index] 1, postavi boju na zelenu
          } else {
            div.style.backgroundColor = "#e6e6e6"; // Inače, postavi boju na crvenu
          }
        });
      
    })
  ).subscribe();
}



// const first$=interval(500).pipe(//prvi tok
//     map(x=>"prvi-"+x),
//     take(5)
// );

// const second$=interval(800).pipe(//drugi tok
//     map(x=>"drugi-"+x),
//     take(3)
// );

// //forkJoin
// console.time("timer");
// forkJoin([first$,second$]).subscribe(x=>{
//     console.log("forkJoin",x);
//     console.timeEnd("timer");

// });

// //combineLatest
// combineLatest([first$,second$]).subscribe(x=>{
//     console.log("synced",x);
//     //ne radi timer ovde
// });

// //zip
// zip([first$,second$]).subscribe(x=>{
//     console.log(x);
//     //nisam probala timer
// });

// //mere
// merge(first$,second$).subscribe(x=>{
//     console.log(x);
//     //nisam probala timer
// });

/////////////////////////////////////

// from([1,2,3,4,5,6,7]).pipe(//niz moze i da se dobija kroz vreme->NIJE BITNO
//     pairwise(),
//     filter(pair=>pair[0]!==pair[1]),
//     //ucinice da se ne ponavljaju cifre i na mestu prvog u paru i na mestu drugog u paru
//     map(pair=>pair[1])//vratice samo drugi u paru iz svih parova
//     //da je bilo pair[0] vratio bi samo prvi
    
//     // filter(x=>x>0),
//     // scan((acc,val)=>{
//     //     return acc+val;//prikazace nam svaku iteraciju
//     // })
// ).subscribe(x=>console.log(x));//pravicemo observable od predefinisanog niza
// //moze da se sa ovim nizom radi kao i sa bilo kojim drugim observable (nema veze to sto se ne menja kroz vreme)



//////////////////////


// import {Movie} from "./movie";

// interface Coordinates{
//     x:number,
//     y:number
// }

// fromEvent(document, "mousemove").pipe(
//     sampleTime(500),
//     //vadimo neki DOM event nad targetom koji je sada document/moze da bude nesto drugo
//     map((ev:MouseEvent)=>({x:ev.screenX,y:ev.screenY}))
//     //mapiramo mouseevent na neki nas objekat x i y
// ).subscribe(/*(coords:Coordinates)=>console.log(coords)*/);
// //da je trebalo nesto drugo da radi, a ne samo da consoleloguje to bi nam ubilo procesor skroz, 
// //zato stavljamo sample time-da nas ne bi spamovao kad god stigne-> dobijamo bolje performanse
// //drugacije stampa na jednom, a drugacije na drugom monitoru

// const URL="http://localhost:3000/movies/";

// function getMovie(title:string): Observable<Movie>//menjamo-nece biti Promise<Movie>
// {//sa observable zapakujemo fetch i sad je on tok podataka
//     const promise =fetch(URL+title)//fetch mi je get movie
//         .then(response=>{//vratice ceo Response i sa viskom podataka
//         if(!response.ok){
//             throw new Error ("Movie not found");
//         }else{
//             return response.json();
//         }
//     })
//     .catch(err=>console.error(err));
//     return from(promise);//ako je from onda vracamo observable
// }

// function createSuggestion(){
//     const inputEl=document.createElement("input");
//     document.body.appendChild(inputEl);

//     fromEvent(inputEl,"input").pipe(
//         debounceTime(500),//prakticno se najvise koristi sa suggest ili neki rad sa tekstovima
//         map((ev:InputEvent)=>(<HTMLInputElement>ev.target).value),
//         filter((txt:string)=>txt.length>=3),//nema smisla pretrazivati reci krace od 3 slova
//         switchMap(title=>getMovie(title))
//     ).subscribe(movie=>console.log("query filma ",movie));

//     // fromEvent(inputEl,"input").pipe(
//     //     debounceTime(500),//prakticno se najvise koristi sa suggest ili neki rad sa tekstovima
//     //     map((ev:InputEvent)=>(<HTMLInputElement>ev.target).value),
//     //     filter((txt:string)=>txt.length>=3),//nema smisla pretrazivati reci krace od 3 slova
//     // ).subscribe(txt=>console.log("query baze za "+txt));
// }

// createSuggestion();

// getMovie("rambo").subscribe(movie=>
//     console.log("film je ",movie)//stavila sam bila plus i pisalo mi je samo object, a ne film
// );

//////
//interval(500).subscrive(x=>console.log('timer: '+x));

// function execInterval
// (ob$:Observable<any>
//     /*ili bey parametara*/ 
//     )//iyblegavati any
// :Subscription{

//     return interval(500).pipe(
//         map(x=>x*x),//x krece od nule 
//         //take(20)
//         takeUntil(ob$)
//     ).subscribe(x=>console.log('timer: '+x));
    
// }

// const controlFlows$=new Subject();

// function execRange(): Subscription{

//     return range(15,50).pipe(
//         filter(x=>x%2===0),
//         map(x=>x+3)
//     ).subscribe(x=>console.log('range: '+x));
    
// }

// function createUnsubsribeButton(/*sub:Subscription*/
// controlFlows$:Subject<any>){
// const button=document.createElement("button");
// document.body.appendChild(button);
// button.innerHTML="stop";
// button.onclick=()=>
// //sub.unsubscribe();
// {
//     console.log("Control Stream closed");
//     controlFlows$.next(1);
//     controlFlows$.complete();
    
// }
// }




// //const sub1=execInterval(controlFlows$);
// createUnsubsribeButton(controlFlows$);


// function execGenerator(){
//     new Observable((generator)=>{
//         setInterval(()=>{
//             const number=Math.round(Math.random()*10);
//             generator.next(number);
//         //izvrsava se samo jednom ako ne stavimo setInterval
//         },500);        
//     }).pipe(
//         //bez take izvrsavace se do sutra
//         take(10)
//     ).subscribe(x=>console.log("gen: "+x))
// }

// execGenerator();

//////////////////////////////////////////////
// import {User} from "./user";

// document.write("hello world");



// const user1=new User("marko","marko@email.com");
// user1.name="ana";
// const user2=new User("ivana","ivana@email.com");
/////////////////////////////////////////////////

// async function getRandomNumber2(){
//     const p=new Promise<number>((resolve,reject)=>{
//         setTimeout(()=>{
//             const n=Math.round(Math.random()*10);
//             if(n<5)
//             {
//                 reject(" previse mali broj");
//             }
//             else
//             {
//                 resolve(n);
//             }
//         },1500);
//     });
//     return p;
// }

// // getRandomNumber2()
// //     .then((x:number)=>{
// //         console.log("prvi "+x);
// //         return getRandomNumber2();
// //     })
// //     .then((x:number)=>{
// //         console.log("drugi "+x);
// //     })
// //     .catch(reason=>{
// //         console.warn("Javila se greska"+reason);
// //     });

// async function main(){
    
//         try{
//             for(let i=0;i<4;i++)
//     {
//             const br=await getRandomNumber2();
//             console.log("Iz main-a "+br);
//         }
//     }
//         catch(e){
//             console.log("Javila se greska "+e);
//         }
        
    
    
// }
//main();     

// Promise.all([
//     getRandomNumber2(),
//     getRandomNumber2(),
//     getRandomNumber2(),

// ]).then(array=>console.log("brojevi ",array));

// function getRandomNumber(cb?: Function)
// {
//     setTimeout(()=>{
//         console.log("Rand: "+Math.round(Math.random()*10));
//         if(typeof cb != "undefined")
//         {
//          cb();
//         }
//     },1500);
    
// }

//getRandomNumber(()=>getRandomNumber(()=>getRandomNumber(getRandomNumber)));
// console.log("ovde sam");