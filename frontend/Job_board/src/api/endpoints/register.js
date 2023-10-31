import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL

export const registerUser = function (data){

    fetch(`${baseUrl}/auth/register`,{
      method:"POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    }).then(res =>{

      if(res.status ==200){
        toast.success("Account successfully created")
      }
      else if(res.status ==406){
        toast.error("Missing data")
      }
      else if(res.status ==401){
        toast.error("Could not create account")
      }
      else if(res.status ==409){
        toast.error("Could not create account")
      }
      else{
        toast.error("Something wrong happened")
      }})
    }