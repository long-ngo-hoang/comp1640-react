import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/profilesSlice.js';
import { useParams  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/profilesSlice.js'
import { getProfileById } from '../../redux/profilesSlice';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBValidation,
    MDBSpinner
  } from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1.jsx';
import AddDepartmentToUser from '../Departments/addDepartment.jsx';
import AddRoles from '../Role/addRole.jsx';
import DetailsUserRoles from '../Role/details.jsx';

export default function UpdateUser() {

    const { id } = useParams()
    const dispatch = useDispatch();
    const user = useSelector(selectAllUsers)

    const {loading} =  useSelector(
      (state) => state.user
      );

    useEffect(()=>{
       dispatch(getProfileById(id));
    },[])

    const [users, setUsers] = useState({
        id: id,
        avatarUrl: user?.avatarUrl,
        fullName: user?.fullName,
        address: user?.address,
        phone: user?.phone,
    });
  
    const onChangeAvatarUrl = (e) =>{
        setUsers((preV) => {     
            return{...preV, avatarUrl: e.target.value}
        })
    }

    const onChangeFullName = (e) =>{
        setUsers((preV) => {
            return{...preV, fullName: e.target.value}
        })
    }

    const onChangeAddress = (e) =>{
        setUsers((preV) => {
            return{...preV, address: e.target.value}
        })
    }

    const onChangePhone = (e) =>{
        setUsers((preV) => {
            return{...preV, phone: e.target.value}
        })
    }

    const handleSubmit =  (event )=> {
      if(users.fullName && users.address && users.phone){
        event.preventDefault();
        dispatch(updateProfile(users)) 
      }
    }
    if(loading){
      return (
      <>
      <MDBSpinner color='primary'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </>)
    }
return (
    <>
      <Navbar1/>
      <br/>
      <MDBContainer className="">
     
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">    
                    <MDBValidation className='row g-0'> 

            <MDBCard className="mb-4">
              <MDBCardBody>

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input  id='form2' type='text' onChange={onChangeFullName} value={users.fullName} required/>                   
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input  id='form2' type='text' onChange={onChangePhone} value={users.phone} required/>                   
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input  id='form2' type='text' onChange={onChangeAddress} value={users.address} required/>                   
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <button  type="submit"  className="btn btn-primary" style={{width: "20%"}} onClick={handleSubmit}>Update Profile</button>
            </MDBValidation>

            <hr/>
            <h6>Departments</h6>
            <AddDepartmentToUser/>
            <hr/>
            <MDBRow>
              <MDBCol sm="3">
                <MDBCardText>Roles</MDBCardText>
              </MDBCol>
              <MDBCol sm="9">
                <DetailsUserRoles/>
              </MDBCol>
            </MDBRow>
            <AddRoles/>
            <hr/>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}