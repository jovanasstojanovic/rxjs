import { lista } from "../raspored/lista";
import { Predaja } from "./predaja";
import { tabela } from "../raspored/tabela";
import { unosTermina } from "./unosTermina";


export function ime(){

  const containerPodaci = document.createElement("div");
            containerPodaci.style.backgroundColor = "#ffccff";
            containerPodaci.style.borderRadius = "50px";
            containerPodaci.style.padding = "20px";
            containerPodaci.style.paddingLeft = "40px";
            containerPodaci.style.margin = "15px";
            containerPodaci.style.marginTop = "0px";

  const manji = document.createElement("div");
    document.body.appendChild(containerPodaci);
            manji.style.display = "flex";
  const labela = document.createElement("label");
            labela.innerHTML = "Your name: ";
            labela.style.fontFamily = "'Trebuchet MS', sans-serif";
            labela.style.fontSize = "25px";
    manji.appendChild(labela);

  const unosImena=document.createElement("input");
            unosImena.style.fontSize = "25px";
            unosImena.style.fontFamily = "'Trebuchet MS', sans-serif";
            unosImena.style.borderRadius = "50px";
            unosImena.style.paddingLeft = "10px";
            unosImena.style.color = "#b300b3";

  const help = document.createElement("label");
            help.innerHTML = "Help";
            help.style.marginLeft = "20px";
            help.style.marginTop = "5px";
            help.style.fontSize = "20px";
            help.style.textDecoration = "underline";
            help.style.cursor = "pointer";
            help.style.fontFamily = "'Trebuchet MS', sans-serif";

    help.addEventListener('mouseover', () => {

            help.style.color = 'black';
            popup.style.display = "flex";
            popup.style.flexDirection = "row";
            popup.style.justifyContent = "center";
            popup.style.alignItems = "center";

    });

    help.addEventListener('mouseout', () => {

            help.style.color = '#b300b3';
            popup.style.display = "none";

    });       

  const popup = document.createElement("div");
            popup.innerHTML = "Schedule supports a maximum of 10 users per Date.";
            popup.style.display = "none";
            popup.style.backgroundColor = "black";
            popup.style.opacity = "70%";
            popup.style.borderTopLeftRadius = "15px";
            popup.style.borderTopRightRadius = "15px";
            popup.style.borderBottomRightRadius = "15px";
            popup.style.color = "white";
            popup.style.width = "400px";
            popup.style.marginLeft = "20px";
    
    manji.appendChild(unosImena);
    manji.appendChild(help);
    manji.appendChild(popup);

    containerPodaci.appendChild(manji);
    
  const termini = document.createElement("div");
    termini.appendChild(unosTermina());
            termini.style.display = "flex";
            termini.style.justifyContent = "center";

    containerPodaci.appendChild(termini);
    containerPodaci.appendChild(Predaja(unosImena));

            containerPodaci.style.marginBottom = "30px";

  const linija = document.createElement("div");
            linija.style.width = "100%";
            linija.style.height = "1px";
            linija.style.backgroundColor = "#e6e6e6";
            linija.style.marginBottom = "20px";
    document.body.appendChild(linija);

  const tabelica = document.createElement("div");
            tabelica.style.display = "flex";
            tabelica.style.flexDirection = "row";
            tabelica.style.width = "60%";
            tabelica.style.marginLeft = "20%";

  const naslov = document.createElement("div");
  
  const raspored = document.createElement("label");
            naslov.style.display = "flex";
            naslov.style.justifyContent = "center";
            naslov.style.marginBottom = "10px";
    naslov.appendChild(raspored);

            raspored.style.fontFamily = "'Brush Script MT', cursive";
            raspored.innerHTML = "Schedule";
            raspored.style.color = "#343434";
            raspored.style.fontSize = "70px";
    document.body.appendChild(naslov);

    document.body.appendChild(tabelica);
    tabela(tabelica);
    lista();
    
}