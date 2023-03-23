import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getCategories} from '../../redux/categoriesSlice'
import {selectAllCategories} from '../../redux/categoriesSlice'
import {deleteCategory} from '../../redux/categoriesSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";

const ViewCategories = () => {

 const dispatch = useDispatch()
  
 useEffect(() => {
    dispatch(getCategories())     
  }, [])
  
  const categoriesInDb = useSelector(selectAllCategories)
 
  const handleRemove = async (id) => {
   await dispatch(deleteCategory(id));
   window.location.reload(false)
  }


  return (
    <>
        <Navbar1/>
        <section className="gradient-custom-2 vh-100">
        
                    <MDBContainer className="py-5 h-100">
                      <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol md="12" xl="10">
                          <MDBCard>
                            <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between"}}>
                              <div>
                              <h5 className="mb-0">
                                <MDBIcon fas icon="tasks" className="me-2" />
                                Categories
                              </h5>
                              </div>
                              <div>
                              <Link type="button" className="btn btn-primary" to={`/categories/create`}>
                                  Create Categories
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
                                {categoriesInDb === null 
                                  ? <h1> page not have data</h1> :
                                  categoriesInDb?.map(item =>
                                    (   
                                    <tr className="fw-normal" key={item.id}>
                                      <td className="align-middle">
                                        <span>{item.name}</span>
                                      </td>  
                                      <td className="align-middle">

                                      <button style={{background: "none", border: "none"}}>
                                        <Link to={`/categories/edit/${item.id}`}>
                                          <MDBIcon
                                            fas
                                            icon="edit"
                                            color="success"
                                            size="lg"
                                            className="me-3"
                                          />
                                          </Link>
                                        </button>
                                        <button style={{background: "none", border: "none"}} onClick={() => handleRemove(item.id)}>
                                          <MDBIcon
                                            fas
                                            icon="trash-alt"
                                            color="danger"
                                            size="lg"
                                            className="me-3"
                                          />
                                          </button>
                                      </td>
                                    </tr>
                                   ))}
                                  </MDBTableBody>
                                </MDBTable>
                              </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </section>
</>
  )
}

export default ViewCategories;