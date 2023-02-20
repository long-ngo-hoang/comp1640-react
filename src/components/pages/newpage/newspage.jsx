import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
// import "./ecommerce-category-product.css";
import './newpages.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {FaArrowRight, FaBell, FaThumbsDown, FaThumbsUp, FaUser, FaTimesCircle} from "react-icons/fa";

class NewsPage extends Component {
  state = {clicked: false};
  handleClick = () =>{this.setState({clicked:!this.state.clicked})}
  render(){
  return (
    <>
    <nav>
      <div>
        <ul id="navbar" className={this.state.clicked ? "#navbar active":"#navbar"}>
          <li><a href="index.html">Department 1</a></li>
          <li><a href="index.html">Manage Ideas</a></li>
          <li><a href="index.html">View All Ideas</a></li>
          <li><a href="index.html">Create Ideas</a></li>
        </ul>
      </div>
      <div id="mobile" onClick={this.handleClick}>
        <i id="bar"
        className={this.state.clicked ?"fas fa-times":"fas fa-bars"}></i>
      </div>
      <div>
      <div className="fas">
        <i className="fas fa-bell"></i>
      </div>
      <div className="fas">
        <i className="fas fa-user"></i>
      </div>
      </div>
    </nav>

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
                  <p>Hello</p>
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
                  <p>Hello</p>
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
                  <p>Hello</p>
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
}
export default NewsPage;