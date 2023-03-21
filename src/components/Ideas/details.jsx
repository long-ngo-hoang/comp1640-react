import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteComment } from '../../redux/commentsSlice'
import { getIdeaById } from '../../redux/ideasSlice'
import {selectIdeaById} from '../../redux/ideasSlice'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from 'mdb-react-ui-kit';
  import Navbar1 from '../navbar/navbar1';
  
export default function DetailIdea() {

    const { id } = useParams()
    const idea = useSelector(selectIdeaById)
    const [showCommet, setShowComment] = useState(true)
    const dispatch = useDispatch()

    const onClickShowComment = () => setShowComment(!showCommet)

    function handleRemove(id) {
         dispatch(deleteComment(id));
    }

    useEffect(() => {
        dispatch(getIdeaById(id))     
      }, [])
    // const renderListComment = idea.comments?.map((item) =>
    //  <li key={item.id}>{item.content}</li> );

    if (!idea) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
<>
        <Navbar1 />
        <MDBContainer fluid>
          <MDBRow className='justify-content-center align-items-center m-5'>
            <MDBCard>
              <MDBCardBody className='px-4'>
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Details Idea</h3>
                <h6>Anonymous is : {idea.isAnonymous}</h6>
                  <br />
                <MDBRow>
               
                  <MDBCol md='12'>
                    <h6 className="mb-0">Name : </h6>
                    <p>{idea.name}</p>
                  </MDBCol>
      
                  <MDBCol md='12'>
                    <h6 className="mb-0">Description : </h6>
                    <p>{idea.description}</p>
                  </MDBCol>
                </MDBRow>           
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          
        <MDBRow className='justify-content-center align-items-center m-5 ' >
          <MDBCard
            className="shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <MDBCardBody className='px-4'>
            <h3>Comments</h3>
              <MDBInput wrapperClass="mb-4" placeholder="Type comment..." />

              <MDBCard className="mb-4">
                <MDBCardBody>
                  <p>Type your note, and hit enter to add it</p>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p className="small mb-0 ms-2">Written by: Martha</p>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCardBody>
          </MDBCard>
      </MDBRow>
      </MDBContainer>
   
            <ul className='item'>
            {idea.comments?.map(item=> (
                <li key={item.id}>{item.content}
                <button type="button" className='btn btn-danger btn-remove' onClick={() => handleRemove(item.id)}>Remove</button>
                {/* <button><Link to={`/idea/comment/edit/${item.id}`}>Edit Post</Link></button> */}
                <Link to={`/idea/comment/edit/${item.id}`}><button className='btn btn-info btn-edit'>Edit Post</button></Link>
                    </li>
                ))}
                {/* <AddComments/> */}
                {/* {renderListComment} */}
            </ul>
            <p className="postCredit">      
            </p>
        </>
    )
}


