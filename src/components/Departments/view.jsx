import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getDepartments} from '../../redux/departmentsSlice'
import {selectAllDepartments} from '../../redux/departmentsSlice'
import {deleteDepartmentsAsync} from '../../redux/departmentsSlice'
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

const ViewDepartments = () => {
  const departmentsInDb = useSelector(selectAllDepartments)
  const dispatch = useDispatch()

  function handleRemove(id) {
    dispatch(deleteDepartmentsAsync(id));
  }

  useEffect(() => {
    dispatch(getDepartments())     
  }, [])

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
                          Departments
                        </h5>
                        </div>
                        <div>
                        <Link type="button" className="btn btn-primary" to={`/departments/create`}>
                            Create Departments
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
                          {departmentsInDb === null 
                            ? <h1> page not have data</h1> :
                            departmentsInDb?.map(item =>
                              (   
                              <tr className="fw-normal" key={item.id}>
                                <td className="align-middle">
                                  <span>{item.name}</span>
                                </td>  
                                <td className="align-middle">

                                <button style={{background: "none", border: "none"}}>
                                  <Link to={`/departments/edit/${item.id}`}>
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
export default ViewDepartments;