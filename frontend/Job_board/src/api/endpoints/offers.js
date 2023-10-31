const baseUrl = import.meta.env.VITE_BASE_URL
import { toast } from "react-toastify"

export async function getAllOffers(data){
    const res = await fetch(`${baseUrl}/offers/getAll`,{
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