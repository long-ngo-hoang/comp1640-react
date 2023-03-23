import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/usersSlice.js';
import { useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/usersSlice.js'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBSwitch,
    MDBTextArea,
    MDBCardImage,
    MDBIcon,
  } from 'mdb-react-ui-kit';

export default function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(selectAllUsers)

    const [users, setUsers] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    });
  
    const onChangeMail = (e) =>{
        setUsers((preV) => {     
            return{...preV, email: e.target.value}
        })
    }

    const onChangePassword = (e) =>{
        setUsers((preV) => {     
            return{...preV, password: e.target.value}
        })
    }

    const onChangeNewPassword = (e) =>{
        setUsers((preV) => {
            return{...preV, newPassword: e.target.value}
        })
    }

    const onChangeConfirmPassword = (e) =>{
        setUsers((preV) => {
            return{...preV, confirmPassword: e.target.value}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(changePassword(users)
        ) 
        navigate(`/profile/view`)
    }

        return (
          <>
          <MDBContainer fluid >
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard style={{backgroundColor: "#eee"}}>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Password</h3>
            <MDBRow>
              <MDBCol md='12'>
                <h5 className="mb-0">Emai : </h5>
                <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangeMail} value={users.email}/>
              </MDBCol>
              <MDBCol md='12'>
                <h5 className="mb-0">Password : </h5>
                <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangePassword} value={users.password}/>
              </MDBCol>
              <MDBCol md='12'>
                <h5 className="mb-0">New password : </h5>
                <MDBInput wrapperClass='mb-4'   id='form2' type='text' onChange={onChangeNewPassword} value={users.newPassword}/>
              </MDBCol>
              <MDBCol md='12'>
                <h5 className="mb-0">Confirm Password : </h5>
                <MDBInput wrapperClass='mb-4'   id='form2' type='text' onChange={onChangeConfirmPassword} value={users.confirmPassword}/>
              </MDBCol>
            </MDBRow>           
          </MDBCardBody>
          <MDBCol md='12'>
            <button className="btn btn-primary" onClick={handleSubmit}>Update Password</button>
          </MDBCol>
        </MDBCard>
      </MDBRow>
      </MDBContainer>
          </>
        )
}