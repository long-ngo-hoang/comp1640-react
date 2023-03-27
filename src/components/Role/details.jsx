import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../redux/roleSlice'

const DetailsUserRoles = () => { 
    const { id } = useParams()

    const dispatch = useDispatch()
    const {loading, users }=  useSelector(
        (state) => state.roles)
        
    useEffect(()=>{
        dispatch(getUserById(id),[]);
    },[])

    return (
      <>
       {loading && <h2>page loadding</h2>}
       {!loading && users?
       <ul>
            <p>{users?.role?.name}</p> 
       </ul> : null }
      </>
    )
  }

  export default DetailsUserRoles;