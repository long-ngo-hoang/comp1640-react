import React from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Navbar1 from "../../navbar/navbar1";

import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";

function ManageIdeas(){
 
  
  return (
    <>
    <Navbar1/>
    
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-9">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="9">
                  <div style={{display: "flex", justifyContent: "center"}}> 
                  <h5>Name Ideas</h5> 
                  </div>

                  
                  <p className="text-truncate mb-4 mb-md-0">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  lg="3"
                  className="border-sm-start-none border-start"
                 style={{display: "flex"}}>
                  <div style={{width: "30%"}}>
                        <div className="container">                  
                          <FaThumbsUp icon="fa-regular fa-thumbs-up" style={{display:"flex"}} />      
                          <p>200</p>      
                        </div>
                        <div className="container"> 
                          <FaThumbsDown icon="fa-regular fa-thumbs-down"  />  
                          <p>18</p>
                        </div>
                 </div>
                 <div style={{width: "70%", margin: "auto"}}>
                    <button type="button" class="btn btn-danger" style={{marginRight: "5px"}} >Delete</button>

                    <button type="button" class="btn btn-primary">Update</button>
                 </div>
                
                 
                </MDBCol>
              </MDBRow>
              
            </MDBCardBody>
              <MDBCardBody>
              <MDBRow>
                <MDBCol md="9">
                  <div style={{display: "flex", justifyContent: "center"}}> 
                  <h5>Name Ideas</h5> 
                  </div>

                  
                  <p className="text-truncate mb-4 mb-md-0">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  lg="3"
                  className="border-sm-start-none border-start"
                 >
                  <div style={{width: "30%"}}>
                        <div className="container">                  
                          <FaThumbsUp icon="fa-regular fa-thumbs-up" style={{display:"flex"}} />      
                          <p>200</p>      
                        </div>
                        <div className="container"> 
                          <FaThumbsDown icon="fa-regular fa-thumbs-down"  />  
                          <p>18</p>
                        </div>
                 </div>
                 <div style={{width: "70%", margin: "auto"}}>
                    <button type="button" class="btn btn-danger" style={{marginRight: "5px"}} >Delete</button>

                    <button type="button" class="btn btn-primary">Update</button>
                 </div>
                
                 
                </MDBCol>
              </MDBRow>
              
            </MDBCardBody>
              <MDBCardBody>
              <MDBRow>
                <MDBCol md="9">
                  <div style={{display: "flex", justifyContent: "center"}}> 
                  <h5>Name Ideas</h5> 
                  </div>

                  
                  <p className="text-truncate mb-4 mb-md-0">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable.
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  lg="3"
                  className="border-sm-start-none border-start"
                 style={{display: "flex"}}>
                  <div  style={{width: "30%"}}>
                        <div className="container">  
                                     
                          <FaThumbsUp icon="fa-regular fa-thumbs-up" style={{display:"flex"}} />
                          <p>18</p>      
                              
                        </div>
                        
                        <div className="container">
                                      

                          <FaThumbsDown icon="fa-regular fa-thumbs-down"  />  
                          <p>200</p>
                        </div>
                 </div>

                 <div style={{width: "70%", margin: "auto"}}>
                 <button type="button" class="btn btn-danger" style={{marginRight: "5px"}} >Delete</button>

                 <button type="button" class="btn btn-primary">Update</button>
                 </div>
               
                
                 
                </MDBCol>
              </MDBRow>
              
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </>
  );
}

export default ManageIdeas;