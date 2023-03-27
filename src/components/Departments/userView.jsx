import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/roleSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'
import Navbar1 from "../navbar/navbar1";

  const ViewUser = () => { 
  
    const dispatch = useDispatch()
    const {loading, users }=  useSelector((state) => state.roles)

    const [show, setShow] = useState(true)

    useEffect(()=>{
        dispatch(getUser(),[]);
    },[])

    useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);

    return (
      <>
      <Navbar1/>
             <MDBContainer fluid >
              
              <MDBRow className='justify-content-center align-items-center m-4'>
                    <MDBCard>
                      <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <div style={{display: "flex", justifyContent: "space-beetwen"}}>
                        <h5 className="mb-0">
                          <MDBIcon fas icon="tasks" className="me-2" />
                          User
                        </h5>
                        </div>
                        <div>
                        <Link type="button" className="btn btn-primary" to={`/departments/register`}>
                            Create Account 
                        </Link>
                        </div>
                      </MDBCardHeader>
                        <MDBCardBody>
                          <MDBTable className="mb-0">
                            <MDBTableHead>
                              <tr>
                                <th scope="col">Name</th> 
                                <th scope="col">Actions</th>
                              </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                            {loading && <h2>page loadding</h2>}
                              {!loading && users.length ? 
                                users?.map((item) => (  
                              <tr className="fw-normal" key={item.id}>
                                <td className="align-middle">
                                  <span>{item.userName}</span>
                                </td>  
                                <td className="align-middle">
                                <button style={{background: "none", border: "none"}}>
                                            <Link to={`/profile/edit/${item.id}`}>
                                              <MDBIcon
                                                fas
                                                icon="edit"
                                                color="success"
                                                size="lg"
                                                className="me-3"
                                              />
                                            </Link>
                                        </button>
                                </td>
                              </tr>
                             )): null}
                            </MDBTableBody>
                          </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                </MDBContainer>
      </>
    )
  }

  export default ViewUser;