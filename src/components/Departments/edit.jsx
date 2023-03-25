import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateDepartment} from '../../redux/departmentsSlice'
import {  useParams, useNavigate  } from 'react-router-dom';
import { selectDepartmentById} from '../../redux/departmentsSlice'
import {getDepartmentById} from '../../redux/departmentsSlice'
import { selectUser } from '../../redux/departmentsSlice';
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
  MDBTableHead,MDBTableBody
} from 'mdb-react-ui-kit';

import Navbar1 from '../navbar/navbar1';
import { async } from 'q';

export default function UpdateDepartments() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(id)
  const department = useSelector((state) => selectDepartmentById(state, id))
  
  const [departmentName, setDepartmentName] = useState(department?.name);
    
  const onChangeName = (e) =>{
    setDepartmentName(e.target.value);
  }

  const handleUpdate = async (event )=> {
      event.preventDefault();
      await dispatch(updateDepartment({id: department.id ,name: departmentName})) 
      window.location.reload(false)
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
              <MDBRow className='justify-content-center align-items-center m-5'>
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
                                  <button><Link to={`/profile/edit/${item.id}`}>Edit User</Link></button>
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
              <MDBRow className='justify-content-center align-items-center m-5'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Departments</h3>
                  <MDBRow>   
                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='text' onChange={onChangeName} value={departmentName}/>
                    </MDBCol>
                  </MDBRow>  
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleUpdate}>Update Departments</button>
                    </MDBCol>        
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>

                  {renderUser}

          </>
        )
}