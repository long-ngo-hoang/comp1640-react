   import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { getIdeasByUserId } from '../../redux/ideasSlice'
  import { deleteIdea } from '../../redux/ideasSlice'
  import {selectAllIdeas} from '../../redux/ideasSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";
import { Link } from 'react-router-dom'
import { useState } from 'react'
import PaddingPage from './paginationPage'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'  

function ManageIdeas(){
 
  const {page} = useParams({page: true})
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
 const ideas = useSelector(selectAllIdeas)
 const {loading,error, totalpage} =  useSelector(
  (state) => state.ideas
  );

    const dispatch = useDispatch()
    
    const [currentPage, setCurrentPage] = useState(1)

    const handleRemove = async (id) =>  {
      await dispatch(deleteIdea(id));
      window.location.reload(false);
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
    <Navbar1/>
    
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-9">
        <MDBCol md="12" xl="10">
        {error && show ? <div>    <Alert variant="success">{error}</Alert>  </div> : null}
          {ideas === null 
            ? <h1> page not have data</h1> :
              ideas?.map(item =>
                 (   
            <div className="container mt-5 mb-5" key={item.id} >
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    <div className="row p-2 bg-white border rounded">
                        <div className="col-md-3 mt-1">
                          <img className="img-fluid img-responsive rounded product-image" src="https://martech.org/wp-content/uploads/2015/11/idea_1920.jpg"/>
                        </div>
                        <div className="col-md-6 mt-1">
                            <h5>{item.name}</h5>
                              <p >{item.description}<br/><br/></p>
                        </div>
                        <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                            <div className="d-flex flex-row align-items-center">
                                <h4 className="mr-1">{item.viewCount}</h4><span className="strike-text">View</span>
                            </div>
                            <h6 className="text-success">{item.author}</h6>
                            <div className="btn-group d-flex mt-4">
                              <Link  className="btn btn-outline-primary"   to={`/ideas/edit/${item.id}`}><MDBIcon icon="edit" color="success" /> 
                              </Link>
                              <Link className="btn btn-outline-primary"  onClick={() => handleRemove(item.id)}> <MDBIcon icon="trash-alt" color="danger" />
                              </Link>
                                            
                              </div>
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
                  ))}    
        </MDBCol>
      </MDBRow>   
      {<PaddingPage/>}
    </MDBContainer>
    </>
  );
}

export default ManageIdeas;