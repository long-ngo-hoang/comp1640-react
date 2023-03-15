import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getAcademicYears} from '../../redux/academicYearsSlice'
import {selectAllAcademicYears} from '../../redux/academicYearsSlice'
import {deleteAcademicYearsAsync} from '../../redux/academicYearsSlice'
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
  MDBTooltip,
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'

const ViewAcademicYears = () => { 

  useEffect(() => {
    dispatch(getAcademicYears())     
  }, [])

  const academicYearsInDb = useSelector(selectAllAcademicYears)

  const dispatch = useDispatch()
  function handleRemove(id) {
    dispatch(deleteAcademicYearsAsync(id));
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
                                    Academic Years
                                  </h5>
                                  </div>
                                  <div>
                                  <Link type="button" className="btn btn-primary" to={`/academicyear/create`}>
                                      Create Idea
                                  </Link>
                                  </div>
                                  
                                </MDBCardHeader>
                                  <MDBCardBody>
                                    <MDBTable className="mb-0">
                                      <MDBTableHead>
                                        <tr>
                                          <th scope="col">Name</th>
                                          <th scope="col">Start Date</th>
                                          <th scope="col">Closure Date</th>
                                          <th scope="col">Final Closure Date</th>
                                          <th scope="col">Actions</th>
                                        </tr>
                                      </MDBTableHead>
                                      <MDBTableBody>
                                    {academicYearsInDb === null 
                                      ? <h1> page not have data</h1> :
                                        academicYearsInDb?.map(item =>
                                        (   
                                        <tr className="fw-normal" key={item.id}>
                                          <td className="align-middle">
                                            <span>{item.name}</span>
                                          </td>
                                          <td className="align-middle">
                                            <span>{item.startDate}</span>
                                          </td>
                                          <td className="align-middle">
                                            <span>{item.closureDate}</span>
                                          </td>
                                          <td className="align-middle">
                                            <span>{item.finalClosureDate}</span>
                                          </td>
                                          <td className="align-middle">
                                            <MDBTooltip
                                              tag="a"
                                              wrapperProps={{ href: "#!" }}
                                              title="Done"
                                            >
                                              <MDBIcon
                                                fas
                                                icon="edit"
                                                color="success"
                                                size="lg"
                                                className="me-3"
                                              />
                                            </MDBTooltip>
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
export default ViewAcademicYears;