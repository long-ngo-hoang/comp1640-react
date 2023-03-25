import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/roleSlice'
import { Link } from 'react-router-dom'
import { Invitations } from '../../redux/departmentsSlice'
import Alert from 'react-bootstrap/Alert' 
  const ViewUser = () => { 
  
    const dispatch = useDispatch()
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )
    const [show, setShow] = useState(true)
    useEffect(()=>{
        dispatch(getUser(),[]);
    },[])
    useEffect(() => {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setShow(false)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);

    function handleInvitations(id) {
      dispatch(Invitations(id));
    }
    
    return (
      <>
       {loading && <h2>page loadding</h2>}
       {!loading && users.length ? 
          users?.map((item) => (
          <div key={item.id}>
            <p>{item.id} </p>  
              <p>{item.userName} </p>   
              <Link type="button" className="btn btn-primary" to={`/departments/addDepartment/${item.id}`}>Add Department</Link>
              {/* <Link type="button" className="btn btn-primary" to={`/departments/addDepartment/${item.id}`}>Add Department</Link> */}
              <button onClick={()=> handleInvitations(item.id)}> Invitations</button>
          </div>
          )) : null 
       }
      </>
    )
  }

  export default ViewUser;