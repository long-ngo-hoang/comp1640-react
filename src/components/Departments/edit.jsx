import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addDepartmentsAsync} from '../../redux/departmentsSlice'
import {  useParams, useNavigate  } from 'react-router-dom';
import { selectCategoryById} from '../../redux/departmentsSlice'
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
    const department = useSelector((state) => selectCategoryById(state, Id))
     const dispatch = useDispatch()
     const navigate = useNavigate()
    const [name, setName] = useState(department?.name);
    
    const onChangeName = (e) =>{
        setName(e.target.value);
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addDepartmentsAsync({name})
        ) 
        navigate(`/departments/view`)
  }  

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
          </>
        )
      
}