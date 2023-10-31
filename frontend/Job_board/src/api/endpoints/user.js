const baseUrl = import.meta.env.VITE_BASE_URL
import {toast} from 'react-toastify'
export async function getUser(userId){
    const res = await fetch(`${baseUrl}/user/${userId}`,{
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
        toast.error("something went wrong")
      return res
      }


  }

  export async function getAllusers(data){
    const res = await fetch(`${baseUrl}/users/getAll`,{
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


  export async function editUser(data){
    const res = await fetch(`${baseUrl}/user/edit`,{
      method:"PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
    if(res.status == 409){
      return toast.error("something went wrong")
    }
    else if(res.status ==200){
        return await res.json()
      }
    else{
      toast.error("something went wrong")
      return false
      }

  }