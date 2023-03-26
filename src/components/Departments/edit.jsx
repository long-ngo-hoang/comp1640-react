import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateDepartment} from '../../redux/departmentsSlice'
import {  useParams, useNavigate  } from 'react-router-dom';
import { selectDepartmentById} from '../../redux/departmentsSlice'
import {getDepartmentById} from '../../redux/departmentsSlice'
import {removeUserFromDepartment} from '../../redux/departmentsSlice';
import { Link } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableHead,MDBTableBody,
  MDBValidation
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';

export default function UpdateDepartments() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const department = useSelector((state) => selectDepartmentById(state, id))
  const {status} = useSelector((state => state.departments))
  console.log(status)
  const [departmentName, setDepartmentName] = useState(department?.name);
    
  const onChangeName = (e) =>{
    setDepartmentName(e.target.value);
  }

  const handleUpdate = async (event )=> {
    if(departmentName !== ''){
      event.preventDefault();
      await dispatch(updateDepartment({id: department.id ,name: departmentName})) 
    }
}

  useEffect(() => {
    dispatch(getDepartmentById(id))     
  }, [])

  const handleRemove = async (id )=> {
    await dispatch(removeUserFromDepartment(id))
    window.location.reload(false)
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

                                  <button style={{background: "none", border: "none"}} onClick={() => handleRemove(item.id)}>
                                    <MDBIcon
                                      fas
                                      icon="trash-alt"
                                      color="danger"
                                      size="lg"
                                      className="me-3"
                                    />
                                    </button>
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
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Departments</h3>
                  <MDBRow>   
                  <MDBValidation className='row g-0'> 

                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4' id='form2' type='text' onChange={onChangeName} value={departmentName} required/>
                    </MDBCol> 
                    <MDBCol md='12'>
                    {status === 'Success' &&  
                    <>
                      <p style={{color: "green"}}>Update Success</p>   
                      </>
                    }
                      <button type='submit' className="btn btn-primary" onClick={handleUpdate}>Update Departments</button>
                    </MDBCol> 
                    </MDBValidation>

                  </MDBRow>  
                     
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>

                  {renderUser}

          </>
        )
}