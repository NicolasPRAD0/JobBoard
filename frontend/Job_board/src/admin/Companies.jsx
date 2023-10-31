import React, { useEffect , useState } from 'react'
import { getAllCompanies } from '../api/endpoints/companies'
import DocContainer from '../Components/DocContainer/DocContainer'


const Companies = () => {
    const [data, setData] = useState(null)
    console.log(data)

    useEffect(()=>{
        getAllCompanies().then(res => {
            if(res){
                setData(res)
            }
        })
        
    },[])
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' , gap:'2vh'}}> 
    <h1>Companies</h1>
    {data?.map((element) => {
      return <DocContainer element={element} />;
    })}
  </div>
  )
}

export default Companies