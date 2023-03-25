import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfiles } from '../../redux/usersSlice.js'
import { selectAllUsers } from '../../redux/usersSlice.js'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'  

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,

} from 'mdb-react-ui-kit';

const UserView = () => {
  const [show, setShow] = useState(true)
    const user = useSelector(selectAllUsers)
    const {error} = useSelector((state)=> state.user)
    const dispatch = useDispatch()

    useEffect(() => {
     dispatch(getProfiles())     
    }, [])

    useEffect(() => {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setShow(false)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);
  return (
    <>
    <h1>Profile</h1>
    <section style={{ backgroundColor: '#FFFFFF' }}>
      <MDBContainer className="">
      {error && show ? <div>    <Alert variant="success">{error}</Alert>  </div> : null}
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
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name: {user.fullName}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone: {user.phone}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBCardText className="text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address: {user.address}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>

            </MDBCard>   
            <MDBCol md='12'>
              <button className="btn btn-primary"><Link to={`/profile/changePass`}></Link>Change Pass</button>
            </MDBCol>       
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
    // <div class="idea__content container">
    //   <h2>List ideas</h2>
    //   <div>
    //   <ul>
    //         <h2>{user.id}</h2>
    //         <h2>{user.createdAt}</h2>
    //         <h2>{user.fullName}</h2>
    //         <h2>{user.address}</h2>
    //         <h2>{user.phone}</h2> 
    //         <button className='col-4'><Link to={`/profile/changePass`}>Change Pass</Link></button>
    //     </ul>
    //   </div>
    // </div>
  )
}
export default UserView;