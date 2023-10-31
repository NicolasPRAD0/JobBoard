import { toast } from "react-toastify"

const baseUrl = import.meta.env.VITE_BASE_URL

export const loginUser = async function (data){
    const res = await fetch(`${baseUrl}/auth/login`,{
      method:"POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
    if(res.status ==200){
      toast.success("Logged In")
    }
    else if(res.status ==401){
      toast.error("Wrong email or password")
    }
    else{
      toast.error("Something wrong happened")
    }
    return res


  }