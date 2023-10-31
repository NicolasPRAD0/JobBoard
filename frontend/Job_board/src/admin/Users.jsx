import React, { useEffect , useState } from 'react'
import { getAllusers } from '../api/endpoints/user'
import DocContainer from '../Components/DocContainer/DocContainer'

const Users = () => {
    const [data, setData] = useState(null)

    useEffect(()=>{
        getAllusers().then(res => {
            if(res){
                setData(res)
            }
        })
        
    },[])
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' , gap:'2vh'}}> 
        <h1>Users</h1>

        {data?.map(element => {
            return <DocContainer element={element}/>

        })

        }
    </div>
  )
}

export default Users