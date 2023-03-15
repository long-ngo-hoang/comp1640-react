import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addDepartmentsAsync} from '../../redux/departmentsSlice'
import {  useNavigate  } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
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
        event.preventDefault();
        dispatch(addDepartmentsAsync({name})
        ) 
        navigate(`/departments/view`)
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
                      <form >
                        <div className="text-danger"></div>
                          <div className="form-outline mb-4">
                            <MDBCol md='12'>
                              <label className="mb-2" >Name</label>
                              <MDBInput  size='lg' id='form2' type='text' onChange={onChangeName} value={name}/>
                            </MDBCol>
                          </div>
                          <MDBCol md='12'>
                            <button className="btn btn-primary" onClick={handleSubmit}>Create Departments</button>
                          </MDBCol>
                       </form>
                    </div>
                  </div>
                </div>
              </MDBRow>
            </MDBContainer>
          </>
        )
}