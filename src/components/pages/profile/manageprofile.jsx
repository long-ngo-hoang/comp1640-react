import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
 
} from 'mdb-react-ui-kit';

import Navbar1 from '../../navbar/navbar1';

export default function ManageProfile() {
  return (
    <>
     <Navbar1/>
    <section style={{ backgroundColor: '#FFFFFF' }}>
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
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input type="text"/>
                   
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input type="text"/>
                    
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input type="text"/>
                

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input type="text"/>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <button type="button" class="btn btn-primary" >Save</button>

            </MDBCard>
            

            <MDBCard>
            <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Department</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <Dropdown>
                     <Dropdown.Toggle variant="success" id="dropdown-basic">
                       Choose Department
                     </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Department 1</Dropdown.Item>
                      <Dropdown.Item>Department 2</Dropdown.Item>
                      <Dropdown.Item>Department 3</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> 
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <button type="button" class="btn btn-primary">Save</button>

              </MDBCard>

            <MDBCard>
            <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Role</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="9">
                  <Dropdown>
                     <Dropdown.Toggle variant="success" id="dropdown-basic">
                       Choose
                     </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Another action</Dropdown.Item>
                      <Dropdown.Item>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> 
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <button type="button" class="btn btn-primary">Save</button>
              </MDBCard>

           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}