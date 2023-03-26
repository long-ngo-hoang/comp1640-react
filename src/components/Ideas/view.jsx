import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getIdeas } from "../../redux/ideasSlice";
import {selectAllIdeas} from "../../redux/ideasSlice";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBSpinner ,
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'
import './view.css'
import { useParams } from "react-router-dom";
import PaddingPage from './paginationPage'
import { addReaction } from "../../redux/reactionSlice";
import { deleteReaction } from "../../redux/reactionSlice";
import Alert from 'react-bootstrap/Alert'  

function ViewIdeas(){  
  const {page} = useParams({page: true})
  const [currentPage, setCurrentPage] = useState(1)
  const [show, setShow] = useState(true)

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
  const {loading, error} = useSelector((state) => state.ideas)
  const dispatch = useDispatch()

  const handleLike = async (id) =>  {
    await dispatch(deleteReaction(id));
    await dispatch(addReaction({ideaId: id, name: "Like"}));
  }

  const handleDislike = async (id) =>  { 
    await dispatch(deleteReaction(id));
    await dispatch(addReaction({ideaId: id, name: "Dislike"}));
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);



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

      <MDBRow className="justify-content-center mb-9">
      {error && show ? <div>    <Alert variant="success">{error}</Alert>  </div> : null}
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
                            <h6 className="text-success">{!item.isAnonymous ? <div>{item.author}</div> : <div>Anoymouse</div>}</h6>
                            <div className="d-flex flex-column mt-4"><Link style={{widows: "100%"}} type="button" className="btn btn-primary" to={`/ideas/detail/${item.id}`}>View More</Link></div>
                            <div className="btn-group d-flex  mt-4" role="group" aria-label="Basic radio toggle button group">
                                <Link className="btn btn-outline-primary" onClick={() => handleLike(item.id)} > <MDBIcon far icon="thumbs-up" /></Link>
                                <Link className="btn btn-outline-primary" onClick={() => handleDislike(item.id)} > <MDBIcon far icon="thumbs-down" /></Link>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
                       )) : null}     
        </MDBCol>
      </MDBRow>
    </MDBContainer>
          {<PaddingPage/>}
    </>
  );
}

export default ViewIdeas;