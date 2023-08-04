import { Dani } from "../../interfejsi/dani";


export function sendUserDataToServer(inputValue: string, dani:Dani): Promise<any> {

  return new Promise((resolve, reject) => {

    fetch('http://localhost:3000/users', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ime: inputValue, dani: dani })

    }).then((response) => {

        if (!response.ok) {

          throw new Error('Greška prilikom slanja podataka na server.');

        }
        return response.json();

      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));

  });
  
}