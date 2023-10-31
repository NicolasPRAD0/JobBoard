const baseUrl = import.meta.env.VITE_BASE_URL

export const createNewOffer = function (data){
    fetch(`${baseUrl}/offer/createOffer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error in JobOffer!');
        }
      })
      .then((data) => {
        setJobOffer({
          jobTitle: '',
          companyName: '',
          contractType:'',
          summaryOffer:'',
          desciption:'',
          location:'',
          dateStart:'',
          requirements:'',
          wage:'',
          creatorId:'',
          companyId:''
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
}

