import { fromEvent } from "rxjs";
import { deleteUsersIfExist } from "./deleteUserIfExist";


export function brisi(div: HTMLDivElement) {

    const ikona = document.createElement("img");
    ikona.src = "../slike/trash.png";
    ikona.style.cursor = "pointer"; 
    ikona.style.width = "50px"; 
    ikona.style.height = "50px";
    ikona.style.marginTop = "10px";
    ikona.style.opacity = "0.7";
   
  
    ikona.addEventListener('mouseover', () => {
      
      ikona.style.opacity = "1";

    });
  
    ikona.addEventListener('mouseout', () => {
    
      ikona.style.opacity = "0.7";

    });
  
    div.appendChild(ikona);
  
    const klik = fromEvent(ikona, 'click').subscribe((dummy) => {

      deleteUsersIfExist('http://localhost:3000').then(() => {

        console.log('Svi korisnici su obrisani iz baze.');

      }).catch((error) => {

        console.error('Došlo je do greške prilikom brisanja korisnika:', error);

      }); 

    });
    
  }