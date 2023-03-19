import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getIdeas } from "../../redux/ideasSlice";
import { deleteIdea } from "../../redux/ideasSlice";
import {selectAllIdeas} from "../../redux/ideasSlice";
import {  useNavigate  } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,MDBIcon
} from "mdb-react-ui-kit";

import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'

function ViewIdeas(){  
  useEffect(() => {
    dispatch(getIdeas())     
  }, [])
  
  const ideas = useSelector(selectAllIdeas)

  const dispatch = useDispatch()

  // function handleLogout() {
  //   dispatch(logout());
  // }
  return (
    <>
    <Navbar1/>
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-9">
        <MDBCol md="12" xl="10">
          
          {ideas === null 
            ? <h1> page not have data</h1> :
              ideas?.map(item =>
                 (   
                  
                 <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" key={item.id} >
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="9">
                  <div style={{display: "flex", justifyContent: "center"}}> 
                    <h5>{item.name}</h5> 
                  </div>
                  <p>
                    {item.description}
                  </p>
                </MDBCol>
                <MDBCol
                  md="2"
                  lg="3"
                  className="border-sm-start-none border-start" style={{display: "block", justifyContent: "center"}}>
                  <div style={{ height: "50%"}}>
                    <div style={{display: "flex", width: "50%", alignItems: "center", height: "50%", margin: "10px"}}>
                        <div className="container">     
                           <MDBIcon far icon="thumbs-up" />             
                           <p>200</p>      
                        </div>
                        <div className="container"> 
                           <MDBIcon far icon="thumbs-down" />
                           <p>18</p>
                        </div>
                    </div>
                    <div style={{width: "50%"}}>
                      <Link style={{widows: "100%"}} type="button" className="btn btn-primary" to={`/ideas/detail/${item.id}`}>View More</Link>
                    </div>  
                 </div>
                 <div style={{display: "flex", alignItems: "center", height: "50%"}}>
                 <p>Written by: {item.author}</p>

                 </div>
                </MDBCol>
                
              </MDBRow>
            </MDBCardBody> 
            </MDBCard>
                       ))}     
         
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    </>
  );
}

export default ViewIdeas;