import React, { useEffect , useState } from 'react'
import { getAllApplications } from '../api/endpoints/jobAppliance'
import DocContainer from '../Components/DocContainer/DocContainer'

const Applications = () => {
    const [data, setData] = useState(null)

    useEffect(()=>{
        getAllApplications().then(res => {
            if(res){
                setData(res)
            }
        })
        
    },[])


  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' , gap:'2vh'}}> 
    <h1>Applications</h1>
    {data?.map((element) => {
      return <DocContainer element={element} />;
    })}
  </div>
  )
}

export default Applications