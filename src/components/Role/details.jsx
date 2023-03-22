import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
    import { getUserByID } from '../../redux/roleSlice'

  const DetailsRoles = () => { 
    const { id } = useParams()
    const dispatch = useDispatch()
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )
    useEffect(()=>{
        dispatch(getUserByID(id),[]);
    },[])

    return (
      <>
       {/* <h1>{users.id}</h1> */}
       {loading && <h2>page loadding</h2>}
       {!loading && users?
       <ul>
            <p>{users.id}</p>
            <p>{users.role.name}</p> 
       </ul>
     
            
        //   users?.map((item) => (
        //   <div key={item.id}>
        //     <p>{item.id} </p>   
        //       <p>{item.role} </p>   
        //   </div>
        //   )) 
          : null 
       }
      </>
    )
  }

  export default DetailsRoles;