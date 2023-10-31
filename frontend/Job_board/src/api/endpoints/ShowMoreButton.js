const baseUrl = import.meta.env.VITE_BASE_URL;

export const showMore = function (id) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/offer/deleteOffer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
      .then((res) => res.json())
      .then((data) => {
        (data);
        resolve(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  });
};