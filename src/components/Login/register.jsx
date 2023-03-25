import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/usersSlice.js';
import { useParams, useNavigate  } from 'react-router-dom';
import { registerUser } from '../../redux/usersSlice.js';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
   
    const [users, setUsers] = useState({
        email: '',
        password: ''
    });

    const onChangeEmail = (e) =>{
        setUsers((preV) => {     
            return{...preV, email: e.target.value}
        })
    }

    const onChangePassword = (e) =>{
        setUsers((preV) => {
            return{...preV, password: e.target.value}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(registerUser(users)
        ) 
        // navigate(`/profile/view`)
    }

        return (
          <>
          <MDBContainer fluid>

<MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
  <MDBCardBody>
    <MDBRow>
      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="envelope me-3" size='lg'/>
          <MDBInput label='Your Email' id='form2' type='email' onChange={onChangeEmail} value={users.email}/>
        </div>

        <div className="d-flex flex-row align-items-center mb-4">
          <MDBIcon fas icon="lock me-3" size='lg'/>
          <MDBInput label='Password' id='form3' type='password' onChange={onChangePassword} value={users.password}/>
        </div>
        <button className='btn btn-primary' style={{marginBottom: "10px"}} size='lg' onClick={handleSubmit}>Register</button>

      </MDBCol>


    </MDBRow>
  </MDBCardBody>
</MDBCard>

</MDBContainer>
            {/* <form>
            <h1>Update User</h1>
                <label htmlFor="name">email</label>
                <input type='text' onChange={onChangeEmail} value={users.email}/>
                <label htmlFor="name">password</label>
                <input onChange={onChangePassword} value={users.password}/>
                <button onClick={handleSubmit}>Register</button>
            </form> */}
          </>
        )
}