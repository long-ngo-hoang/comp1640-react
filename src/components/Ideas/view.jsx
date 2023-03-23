import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getIdeas } from "../../redux/ideasSlice";
import {selectAllIdeas} from "../../redux/ideasSlice";
import {  useNavigate  } from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBSpinner ,
  
} from "mdb-react-ui-kit";
import Dropdown from 'react-bootstrap/Dropdown';

import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'
import './view.css'
import { useParams } from "react-router-dom";
import PaddingPage from './paginationPage'
import { getMostPopularIdeas } from '../../redux/ideasSlice'
import { getMostViewedIdeas } from "../../redux/ideasSlice";

function ViewIdeas(){  
  const {page} = useParams({page: true})
  const [currentPage, setCurrentPage] = useState(1)
  const [sendRequest, setSendRequest] = useState(false);
  const [sendMostView, setSendMostView] = useState(false);

  useEffect(() => {
    dispatch(getIdeas(currentPage))     
  }, [currentPage])

  useEffect(() => {
    if (page !== undefined)
    {
      setCurrentPage(page)  
    }           
  }, [page])

  const ideas = useSelector(selectAllIdeas)
  const {loading} = useSelector((state) => state.ideas)
  const dispatch = useDispatch()
  //GetPolulation
  useEffect(() => {
    if(sendRequest){
       dispatch(getMostPopularIdeas(currentPage))
       setSendRequest(false);
    }
  },
  [sendRequest]);

//getMostView
  useEffect(() => {
    if(sendMostView){
       dispatch(getMostViewedIdeas(currentPage))
       setSendMostView(false);
    }
  },
  [sendMostView]);



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
    <MDBContainer fluid>
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Get Ideas
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={() => setSendRequest(true)}>Most Popular Ideas</Dropdown.Item>
        <Dropdown.Item href="#/action-2"  onClick={() => setSendMostView(true)} >Most View Ideas</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      <MDBRow className="justify-content-center mb-9">
        
        <MDBCol md="12" xl="10">
          
          {!loading && ideas.length ? 
          ideas === null 
            ? <h1> page not have data</h1> :
              ideas?.map(item =>
                 (   

            <div className="container mt-5 mb-5" key={item.id} >
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    <div className="row p-2 bg-white border rounded">
                        <div className="col-md-3 mt-1"><img className="img-fluid img-responsive rounded product-image" src="https://martech.org/wp-content/uploads/2015/11/idea_1920.jpg"/></div>
                        <div className="col-md-6 mt-1">
                            <h5>{item.name}</h5>
                              <p >{item.description}<br/><br/></p>
                        </div>
                        <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                            <div className="d-flex flex-row align-items-center">
                                <h4 className="mr-1">{item.viewCount}</h4><span className="strike-text">View</span>
                            </div>
                            <h6 className="text-success">{item.author}</h6>
                            <div className="d-flex flex-column mt-4"><Link style={{widows: "100%"}} type="button" className="btn btn-primary" to={`/ideas/detail/${item.id}`}>View More</Link></div>
                            <div className="btn-group d-flex  mt-4" role="group" aria-label="Basic radio toggle button group">
                                {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked/> */}
                                <label className="btn btn-outline-primary" htmlFor="btnradio1"><MDBIcon far icon="thumbs-up" />    </label>

                                {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off"/> */}
                                <label className="btn btn-outline-primary" htmlFor="btnradio2"> <MDBIcon far icon="thumbs-down" /></label>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
                       )) : null}     
         
        </MDBCol>
      </MDBRow>
      {<PaddingPage/>}
    </MDBContainer>
    
    </>
  );
}

export default ViewIdeas;