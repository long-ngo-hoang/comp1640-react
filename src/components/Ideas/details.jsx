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
    MDBCardImage,
    MDBIcon,
    MDBSwitch,
    MDBValidation,MDBSpinner
  } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar1 from '../navbar/navbar1';
import { addComment } from '../../redux/ideasSlice';
import { updateReaction } from "../../redux/reactionsSlice";

export default function DetailIdea() {

  const { id } = useParams()

  const idea = useSelector((state) => selectIdeaById(state, id))
  const {loading} = useSelector((state => state.ideas))
  const dispatch = useDispatch()

  const [comment, setComment] = useState({
    ideaId: id,
    content: "",
    isAnonymous: false
  });

  const onChangeContent = (e) =>{
    setComment((preV) => {     
        return{...preV, content: e.target.value}
    })
  }

  const handleLike = async (id) =>  {
    await dispatch(updateReaction({ideaId: id, name: "Like"}));
    window.location.reload(false);

  }

  const handleDislike = async (id) =>  { 
    await dispatch(updateReaction({ideaId: id, name: "Dislike"}));
    window.location.reload(false);

  }

  const onChangeAnonymous = (e) => {
    setComment((preV) => {
        return{...preV, isAnonymous: !comment.isAnonymous}
    }) 
}

  const handleSubmit = (event )=> {
    if(comment.content){
    event.preventDefault();
    dispatch(addComment(comment)
    ) 
    }
  }

  const handleRemove = async(id) => {
    await dispatch(deleteComment(id));
    window.location.reload(false)
  }

  useEffect(()  => {
      dispatch(getIdeaById(id)) 
      }, [])
      
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
          <MDBRow className='justify-content-center align-items-center m-4'>
            <MDBCard>
              <MDBCardBody className='px-1'>
                <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Details Idea</h3>
                <h6 className="mb-0">Author : </h6>
                  {idea?.isAnonymous ? <div>Anonymouse</div> : <div> {idea.author}</div>}
                  <hr class="hr" />

                <MDBRow>
                  <MDBCol md='12'>
                    <h6 className="mb-0">Name : </h6>
                    <p>{idea.name}</p>
                    <hr class="hr" />

                  </MDBCol>
                  
                  <MDBCol md='12' >
                    <h6 className="mb-0">Description : </h6>
                    <p>{idea.description}</p>
                    <hr class="hr" />
                  </MDBCol >

                    <h6 className="mb-0">Documents : </h6>
                  <MDBCol  md="2" lg="2" xl="2" style={{display: "flex", width: "100%"}}>
                  {idea.documents?.map(item=> (
                    <Link to={item.documentUrl}>
                    <MDBCardImage style={{height: "150px"}}   onClick={item.documentUrl}  key={item.id} src={item.documentUrl} fluid className="rounded-3" alt="Cotton T-shirt" />
                    </Link>                   

                    ))}
                  </MDBCol>   

                  <MDBCol  md="2" lg="2" xl="2" style={{display: "flex", width: "100%"}}> 
                    <div className="btn-group d-flex  mt-4" role="group" aria-label="Basic radio toggle button group">
                      <Link className="btn btn-outline-primary" onClick={() => handleLike(idea.id)} > <MDBIcon far icon="thumbs-up" /></Link>
                      <button className="btn btn-outline-primary"> <MDBIcon  />{idea.reactions.length} Reactions</button>
                      <Link className="btn btn-outline-primary" onClick={() => handleDislike(idea.id)} > <MDBIcon far icon="thumbs-down" color="danger" /></Link>
                    </div>                   
                  </MDBCol>   

                </MDBRow>           
              </MDBCardBody>
            </MDBCard>
          </MDBRow>
          
        <MDBRow className='justify-content-center align-items-center m-4 ' >
          <MDBCard className="shadow-0 border"> 
            <MDBCardBody className='px-4'>
            <h4 >Comments</h4> 
              <div >                
                <MDBSwitch  id='flexSwitchCheckDefault' label='Anonymous' onChange={onChangeAnonymous} checked={comment.isAnonymous} value={comment.isAnonymous}  />
                <MDBValidation className='row g-3'> 
                <MDBCol md='12'>

                <InputGroup className="mb-3" >
                <Form.Control
                    aria-label="Example text with button addon"
                    aria-describedby="basic-addon1" onChange={onChangeContent}  value={comment.content}   placeholder="Type comment..."
                    required />
                  <Button type='submit' variant="outline-secondary" id="button-addon1" onClick={handleSubmit} >
                    Send
                  </Button>
                </InputGroup>
                {loading &&  <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>}
                </MDBCol>

                </MDBValidation> 
              </div>

              {idea.comments?.map(item=> (
              <MDBCard className="mb-4" key={item.id}>
                <MDBCardBody>
                  <p>{item.content}</p>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p className="small mb-0">{item?.isAnonymous ? <div>Anonymous </div> : <div>{item.author}</div>}</p>
                      <button style={{background: "none", border: "none"}}>
                        <Link to={`/departments/edit/${item.id}`}>
                          <MDBIcon
                            icon="edit"
                            color="success"
                          />
                        </Link>
                      </button>
                      <button style={{background: "none", border: "none"}} onClick={() => handleRemove(item.id)}>
                        <MDBIcon
                          icon="trash-alt"
                          color="danger"
                        />
                      </button>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
              ))}

            </MDBCardBody>
          </MDBCard>
      </MDBRow>
      </MDBContainer>
      </>
    )
}


