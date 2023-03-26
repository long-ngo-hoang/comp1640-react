import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addDepartment} from '../../redux/departmentsSlice'
import {  useNavigate  } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBValidation
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';

export default function AddDepartments() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState('');
    
    const onChangeName = (e) =>{
        setName(e.target.value);
    }

   const handleSubmit = (event )=> {
    if(name !== ''){
        event.preventDefault();
        dispatch(addDepartment({name})
        ) 
        navigate(`/departments/view`)
    }
    }  

        return (
          <>
            <Navbar1/>
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-5'>
                <div className="container" >
                  <div className="card mb-4">
                    <div className="card-header py-3">
                      <h2>Create Departments</h2>
                    </div>
                    <div className="card-body">
                    <MDBValidation className='row g-0'> 

                        <div className="text-danger"></div>
                          <div className="form-outline mb-4">
                            <MDBCol md='12'>
                              <label className="mb-2" >Name</label>
                              <MDBInput   id='form2' type='text' onChange={onChangeName} value={name} required/>
                            </MDBCol> 
                            <br/>
                            <MDBCol md='12'>
                            <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Create Departments</button>
                          </MDBCol>
                          </div>
                       
                       </MDBValidation>

                    </div>
                  </div>
                </div>
              </MDBRow>
            </MDBContainer>
          </>
        )
}