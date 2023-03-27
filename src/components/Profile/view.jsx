import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers, getProfiles } from '../../redux/profilesSlice.js'
import Alert from 'react-bootstrap/Alert'  
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCollapse,
  MDBInput,
  MDBSpinner,
  MDBValidation,
} from 'mdb-react-ui-kit';
import { changePassword } from '../../redux/accountsSlice.js';
import Navbar1 from '../navbar/navbar1.jsx'

const UserView = () => {
    const [show, setShow] = useState(true)
    const user = useSelector(selectAllUsers)
    let {error} = useSelector((state)=> state.accounts)
    const dispatch = useDispatch()

    useEffect(() => {
     dispatch(getProfiles())     
    }, [])

    useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false)
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }
    }, []);

    const [showShow, setShowShow] = useState(false);

    const toggleShow = () => setShowShow(!showShow);
  
    const [account, setAccount] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    });
    const onChangeMail = (e) =>{
        setAccount((preV) => {     
            return{...preV, email: e.target.value}
        })
    }

    const onChangePassword = (e) =>{
        setAccount((preV) => {     
            return{...preV, password: e.target.value}
        })
    }

    const onChangeNewPassword = (e) =>{
        setAccount((preV) => {
            return{...preV, newPassword: e.target.value}
        })
    }

    const onChangeConfirmPassword = (e) =>{
        setAccount((preV) => {
            return{...preV, confirmPassword: e.target.value}
        })
    }
    const handleSubmit =  (event )=> {
      if(account.email && account.password && account.newPassword && account.confirmPassword){
        event.preventDefault();
      dispatch(changePassword(account)) 
      }
    }     
    const {loading} = useSelector((state => state.accounts))

  return (
    <>
    <Navbar1/>
    <br/>
      <MDBContainer className="">
      {error &&  <div>    <Alert variant="success">{error}</Alert>  </div>}
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
           <h3>My Profile</h3>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText >{user.fullName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBCardText > {user.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText > {user.address}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>   
            <hr class="hr" />
            <button color='secondary' className='btn btn-primary btn-rounded' onClick={toggleShow}>Change Password </button>
            
          <MDBCollapse show={showShow}>           
          <br/>
        <MDBCard >
          <MDBCardBody className='px-4'>
            <MDBCardText className="fw-bold mb-4 pb-2 pb-md-0 mb-md-3"></MDBCardText>
            {/* {loading &&  <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>} */}

              {error &&    
                <p style={{color: "red"}}>{error}</p>
              }               
              <MDBValidation className='row g-3'> 

            <MDBRow>
            <MDBCol md='12'>
                <MDBCardText className="mb-0">Confirm Email : </MDBCardText>
                <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangeMail} value={account.email}/>
              </MDBCol>
              <MDBCol md='12'>
                <MDBCardText className="mb-0">Password : </MDBCardText>
                <MDBInput wrapperClass='mb-4'  id='form2' type='password' onChange={onChangePassword} value={account.password} required/>
              </MDBCol>
              <MDBCol md='12'>
                <MDBCardText className="mb-0">New password : </MDBCardText>
                <MDBInput wrapperClass='mb-4'   id='form2' type='password' onChange={onChangeNewPassword}  value={account.newPassword} required/>
              </MDBCol>
              <MDBCol md='12'>
                <MDBCardText className="mb-0">Confirm Password : </MDBCardText>
                <MDBInput wrapperClass='mb-4'   id='form2' type='password' onChange={onChangeConfirmPassword} value={account.confirmPassword} required/>
              </MDBCol>             
               <button type='submit' className="btn btn-primary" style={{width: "40%"}} onClick={handleSubmit}>Update Password</button>
            </MDBRow>       
            </MDBValidation>

          </MDBCardBody>
        </MDBCard>
      </MDBCollapse>  
    </MDBCol>
   </MDBRow>
  </MDBContainer>
    </>
  )
}
export default UserView;