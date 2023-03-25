import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/roleSlice'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'  

const ViewRoles = () => { 
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )
      // console.log(users)
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

    return (
      <>
       {loading && <h2>page loadding</h2>}
       {error && show ? <div>    <Alert variant="success">{error}</Alert>  </div> : null}
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