const baseUrl = import.meta.env.VITE_BASE_URL;
import {toast} from 'react-toastify' 

export const jobAppliance = function (id, data) {
    fetch(`${baseUrl}/offer/jobAppliance/${id}`, {
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
        throw new Error('Error in JobAppliance!');
      }
    })
    .then((data) => {
      setJobApplication({
         applicantId: '',
         offerId: '',
         firstName: '',
         lastName: '',
         email: '',
         age: '',
         message: '',
      });
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export async function getAllApplications(data){
  const res = await fetch(`${baseUrl}/offers/applications/getAll`,{
    method:"GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if(res.status ==200){
      const result = await res.json()
      return result
    }
  else{
      toast.error("something went wrong retrieving existing companies")
      return []
    }
}