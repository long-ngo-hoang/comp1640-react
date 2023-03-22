   import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { getIdeasByUserId } from '../../redux/ideasSlice'
  import { deleteIdea } from '../../redux/ideasSlice'
  import {selectAllIdeas} from '../../redux/ideasSlice'
  import {  useNavigate  } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,MDBIcon
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'

import {FaThumbsDown, FaThumbsUp} from "react-icons/fa";
import { useState } from 'react'
import PaddingPage from './paginationPage'
import { useParams } from 'react-router-dom'

function ManageIdeas(){
 
  const {page} = useParams({page: true})
  
 const ideas = useSelector(selectAllIdeas)
 const {loading,error, totalpage} =  useSelector(
  (state) => state.ideas
  );

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [currentPage, setCurrentPage] = useState(1)

    function handleRemove(id) {
      dispatch(deleteIdea(id));
    }
    
    useEffect(() => {
      dispatch(getIdeasByUserId(currentPage))     
    }, [currentPage])

    useEffect(() => {
      if (page !== undefined)
      {
        setCurrentPage(page)  
      }           
    }, [page])

  return (
    <>
    <Navbar1/>
    
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-9">
        <MDBCol md="12" xl="10">
          <h1>{page}</h1>
          {ideas === null 
            ? <h1> page not have data</h1> :
              ideas?.map(item =>
                 (   
          <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3" key={item.id}>
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="9">
                  <div style={{display: "flex", justifyContent: "center"}}> 
                  <h5>{item.name} </h5> 
                  </div>
                  <text >
                  {item.description}
                  </text>
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
                    <button type="button" className="btn btn-danger" style={{marginRight: "5px"}} onClick={() => handleRemove(item.id)} >Delete</button>
                    <Link type="button" className="btn btn-primary" to={`/ideas/edit/${item.id}`}>Update</Link>
                 </div>

                </MDBCol>
              </MDBRow> 
            </MDBCardBody>
          </MDBCard>
                  ))}    
        </MDBCol>
      </MDBRow>
     {<PaddingPage/>}
    </MDBContainer>
    </>
  );
}

export default ManageIdeas;