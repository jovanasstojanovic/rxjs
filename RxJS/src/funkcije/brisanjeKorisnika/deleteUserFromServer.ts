

export function deleteUserFromServer(userId: number, baseUrl: string): Promise<any> {

  const url = `${baseUrl}/users/${userId}`;

  return new Promise((resolve, reject) => {

    fetch(url, {

      method: 'DELETE',

    })
      .then((response) => {

        if (!response.ok) {

          reject("greska");

        }
        resolve(response);

      })
      .catch((error) => reject(error));

  });

}