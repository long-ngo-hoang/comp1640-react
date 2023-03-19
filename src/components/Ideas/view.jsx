import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchIdeas } from "../../redux/ideasSlice";
import { deleteIdeaAsync } from "../../redux/ideasSlice";
import {selectAllIdeas} from "../../redux/ideasSlice";
import {  useNavigate  } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import './view.css';
import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'

function ViewIdeas(){  
  useEffect(() => {
    dispatch(fetchIdeas())     
  }, [])
  
  const ideas = useSelector(selectAllIdeas)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  function handleRemove(id) {
    dispatch(deleteIdeaAsync(id));
  }

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
                  <p>Written by: {item.author}</p>
                  <Link type="button" className="btn btn-primary" to={`/idea/detail/${item.id}`}>View More</Link>

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