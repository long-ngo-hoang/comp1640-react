import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addDepartmentsAsync} from '../../redux/departmentsSlice'
import {  useParams, useNavigate  } from 'react-router-dom';
import { selectAllDepartments} from '../../redux/departmentsSlice'
import {getDepartmentsById} from '../../redux/departmentsSlice'
import { selectUser } from '../../redux/departmentsSlice';
import {removeUserFromDepartment} from '../../redux/departmentsSlice';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';



export default function UpdateDepartments() {
    const { Id } = useParams()
     const dispatch = useDispatch()
     const navigate = useNavigate()



    const department = useSelector(selectAllDepartments)
    const users = useSelector(selectUser)
    
    const {loading,error} =  useSelector(
      (state) => state.departments
      );
    const [name, setName] = useState(department?.name);
    
    const onChangeName = (e) =>{
        setName(e.target.value);
    }


    useEffect(() => {
      dispatch(getDepartmentsById(Id))     
    }, [])

    const handleRemove = (id )=> {
      dispatch(removeUserFromDepartment(id)
      ) 
      navigate(`/departments/view`)
}  


   const handleSubmit = (id )=> {
        dispatch(addDepartmentsAsync({id})
        ) 
        navigate(`/departments/view`)
  }  

  const renderUser = (
    <div className="userlist-container">
      {department?.allUsers?.map((item) => (
        <div className="user-container" key={item.id}>
            <p>{item.userName} </p>   
            <button type="button" className="btn btn-danger" style={{marginRight: "5px"}} onClick={() => handleRemove(item.id)} >Delete</button> 
          </div>
      ))}
    </div>
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
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='text' onChange={onChangeName} value={name}/>
                    </MDBCol>
                  </MDBRow>  
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleSubmit}>Update Departments</button>
                    </MDBCol>        
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-5'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  {loading ?(
                    <h2>page loadding</h2>
                  ) :renderUser}
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
          </>
        )
      
}