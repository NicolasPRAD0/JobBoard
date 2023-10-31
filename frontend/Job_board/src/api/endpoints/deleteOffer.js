const baseUrl = import.meta.env.VITE_BASE_URL;

export const deleteOffer = function (id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/offer/deleteOffer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};