import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepartmentById, getDepartmentById} from '../../redux/departmentsSlice'
import {getDepartment, Invitations} from '../../redux/departmentsSlice'
import { Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableHead,MDBTableBody,
  MDBCardText,
  MDBSpinner
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';

import {  useParams  } from 'react-router-dom';

export default function DetailsDepartment() {
  const { id } = useParams()

  const dispatch = useDispatch()

  const department = useSelector((state) => selectDepartmentById(state, id))
  const {loading} = useSelector((state => state.departments))
  
  useEffect(() => {
    dispatch(getDepartment())     
  }, [])

  useEffect(() => {
    dispatch(getDepartmentById(id))     
  }, [])

  function handleInvitations(id) {
    dispatch(Invitations(id));
  }
  const renderUser = (
    <>
            <MDBContainer fluid >
              <MDBRow className='justify-content-center align-items-center m-4'>
                    <MDBCard>
                      <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <div>
                        <h5 className="mb-0">
                          <MDBIcon fas icon="tasks" className="me-2" />
                          User
                        </h5>
                        </div>
                        <div>
                        {loading &&  <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>}
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
                          {department === null 
                            ? <h1> page not have data</h1> :
                            department?.allUsers?.map(item =>
                              (   
                              <tr className="fw-normal" key={item.id}>
                                <td className="align-middle">
                                  <span>{item.userName}</span>
                                </td>  
                                <td className="align-middle">
                                <button style={{background: "none", border: "none"}} onClick={()=> handleInvitations(item.id)}>
                                    <MDBIcon
                                      fas icon="envelope-open-text" 
                                      color="success"
                                                                            size="lg"
                                    />
                                    </button>
                                </td>  

                              </tr>
                             ))}
                            </MDBTableBody>
                          </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                </MDBContainer>
    </>
  );
  const renderIdeas = (
    <>
            <MDBContainer fluid >
              <MDBRow className='justify-content-center align-items-center m-4'>
                    <MDBCard>
                      <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <div>
                        <h5 className="mb-0">
                          <MDBIcon fas icon="tasks" className="me-2" />
                          Ideas
                        </h5>
                        </div>
                      </MDBCardHeader>
                        <MDBCardBody>
                          <MDBTable className="mb-0">
                            <MDBTableHead>
                              <tr>
                                <th scope="col">Name</th> 
                                <th scope="col">Author</th>
                                <th scope="col">View</th>   
                                 <th scope="col">Actions</th>

                              </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                          {department === null 
                            ? <h1> page not have data</h1> :
                            department?.allIdeas?.ideas?.map(item =>
                              (   
                              <tr className="fw-normal" key={item.id}>
                                <td className="align-middle">
                                  <span>{item.name}</span>
                                </td>  
                                <td className="align-middle">
                                  <span>{item.author}</span>
                                </td>  
                                <td className="align-middle">
                                  <span>{item.viewCount}</span>
                                </td>  
                                <td className="align-middle">
                                <button style={{background: "none", border: "none"}}>
                                        <Link to={`/ideas/detail/${item.id}`}>
                                        <i class="fas fa-fast-forward" style={{color: "green"}}></i></Link>
                                </button>
                                </td>  
                              </tr>
                             ))}
                            </MDBTableBody>
                          </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                </MDBContainer>
    </>
  );
        return (
          <>
            <Navbar1 />
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-4'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Details Departments</h3>
                  <MDBRow>   
                  <MDBCol sm="3">
                    <MDBCardText> Name Department: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText >{department?.name}</MDBCardText>
                  </MDBCol>
                  </MDBRow>  
                     
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
            {renderUser}
                  {renderIdeas}

          </>
        )
}