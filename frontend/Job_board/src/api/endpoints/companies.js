const baseUrl = import.meta.env.VITE_BASE_URL
import { toast } from "react-toastify"
import { convertToBase64 } from "../../functions/convertToBase64"

export async function getAllCompanies(data){
    const res = await fetch(`${baseUrl}/companies/getAll`,{
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

  export async function createCompany(data){

    const img = await convertToBase64(data.logo)
    const newData = {...data, logo: img}


    const res = await fetch(`${baseUrl}/companies/create`,{
      method:"POST",
      cache:"no-cache",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(newData),
    })

      if(res.status ==200){
        return toast.success('Created company account')
      }
      if(res.status == 409){
        return toast.error('Company already exists under this name')
      }
      else{
        toast.error("something went wrong creating company")
      }
      return res

  }

  export async function loginCompany(data){
    const res = await fetch(`${baseUrl}/companies/login`,{
      method:"POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
    if(res.status ==200){
      toast.success("logged in")
      
        return res
      }
    else{
      toast.error("something went wrong")
      return res
      }
  }

  export async function editCompany(data){
    const res = await fetch(`${baseUrl}/companies/edit`,{
      method:"PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
    if(res.status == 409){
      return toast.error("A company under this name already exists")
    }
    else if(res.status ==200){
        return await res.json()
      }
    else{
      toast.error("something went wrong")
      return false
      }

  }

  export async function getRecruiters(id){
    const res = await fetch(`${baseUrl}/companies/recruiters/${id}`,{
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
        return []
      }
  }
  export async function addRecruiter(data){
    console.log(data)
    const res = await fetch(`${baseUrl}/companies/recruiter/add`,{
      method:"PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
    })
    if(res.status ==200){
        
        // toast.success("recruiter added")
        const result = await res.json()
        return result
      }
      else if(res.status ==404){
        toast.success("No account found under this email")
        const result = await res.json()
        return result
      }
    else{
        toast.error("something went wrong")
        return null
      }
  }


  