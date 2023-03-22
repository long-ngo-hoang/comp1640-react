import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/roleSlice'
import { Link } from 'react-router-dom'
  const ViewRoles = () => { 
  
    const dispatch = useDispatch()
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )
      // console.log(users)
    useEffect(()=>{
        dispatch(getUser(),[]);
    },[])

    return (
      <>
       {loading && <h2>page loadding</h2>}
       {!loading && users.length ? 
          users?.map((item) => (
          <div key={item.id}>
            <p>{item.id} </p>  
              <p>{item.userName} </p>   
              <Link type="button" className="btn btn-primary" to={`/role/detail/${item.id}`}>View More</Link>
              <Link type="button" className="btn btn-primary" to={`/role/create/${item.id}`}>Add Role</Link>
          </div>
          )) : null 
       }
      </>
    )
  }

  export default ViewRoles;