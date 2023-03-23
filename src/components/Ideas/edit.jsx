import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectedBox from './selectedBox';
import { updateIdea, getIdeaById, selectIdeaById, deleteFile } from '../../redux/ideasSlice';
import { useParams, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSwitch,
  MDBTextArea,
  MDBCardImage,
  MDBIcon
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';
import './addIdea.css'
import { uploadFileToS3, getS3PreSignedUrl, uploadFile } from '../../redux/filesSlice';

export default function UpdateIdea() {

    const { id } = useParams()
     const dispatch = useDispatch();
     const ideaInDb = useSelector((state) => selectIdeaById(state, id))

    useEffect(() => {
      dispatch(getIdeaById(id))     
    }, [])
     
    console.log(selectIdeaById)
        const [idea, setIdea] = useState({
        id : id,
        categoryId: ideaInDb?.categoryId,
        name: ideaInDb?.name,
        description: ideaInDb?.description,
        isAnonymous: ideaInDb?.isAnonymous,
        documents: ideaInDb?.documents
    });
  
    const [slectedCategories, setSelectedCategories] = useState(ideaInDb?.categoryId); 

    const onChangeName = (e) =>{
        setIdea((preV) => {     
            return{...preV, name: e.target.value}
        })
    }
    const onChangeDescription = (e) =>{
        setIdea((preV) => {
            return{...preV, description: e.target.value}
        })
    }

    const onChangeSelected = (e) => {
        setSelectedCategories(e.target.value);
        setIdea((preV) => {
            return{...preV, categoryId: e.target.value}
        })
    }

    const onChangeAnonymous = () => {
        setIdea((preV) => {
            return{...preV, isAnonymous: !idea.isAnonymous}
        })
    }

    const handleUploadFile = async (e)  =>{
      await dispatch(getS3PreSignedUrl())  
      const url = localStorage.getItem('url')

      if(url !== null){
        dispatch(uploadFileToS3({url: url, data:  e.target.files[0]}))      
        localStorage.removeItem('url')
      }
    }

    const handleSubmit = async (event )=> {
        event.preventDefault();
        dispatch(updateIdea(idea))

        idea.documents.forEach(element =>  {
          dispatch(uploadFile({ideaId: id, documentUrl: element }))
        });  
    }

    const handleRemove = async (event )=> {
      dispatch(deleteFile({id: event, ideaId:  id}))
  }

  if (!ideaInDb) {
    return <div className="loader" />;
  }

  else{
    return (
    <>
    <Navbar1 />
    <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-3'>
        <MDBCard>
          <MDBCardBody className='px-1'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Idea</h3>
             <MDBSwitch id='flexSwitchCheckDefault' label='Anonymous' onChange={onChangeAnonymous} checked={idea.isAnonymous} />
              <br />
            <MDBRow>
              <MDBCol md='12'>
                <h5 className="mb-0">Name : </h5>
                <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangeName} value={idea.name}/>
              </MDBCol>

              <MDBCol md='12'>
                <h5 className="mb-0" >Description : </h5>
                <MDBTextArea wrapperClass='mb-4'  id='textAreaExample' rows={8} onChange={onChangeDescription} value={idea.description}/>
                
              </MDBCol>

              <MDBCol md='12'>
              <h5 className="mb-0">Category : </h5>
                    <select  disabled={false} value={slectedCategories} onChange={onChangeSelected}>
                      <SelectedBox/>
                    </select>
                <input type="file" id="files" style={{display: "none"}} onChange={handleUploadFile} />
                <label className='btn btn-primary'  htmlFor="files">Select file</label>
                </MDBCol>
                <MDBCol  md="2"  xl="2" style={{display: "flex", width: "100%"}}>
                  {idea.documents?.map(item=> (
                    <div >
                      <Link className="btn btn-outline-primary"  onClick={() => handleRemove(item.id)}> <MDBIcon icon="trash-alt" color="danger" /></Link> 
                      <br/>
                      <Link to={item.documentUrl}>
                      <MDBCardImage style={{height: "150px"}}   onClick={item.documentUrl}  key={item.id} src={item.documentUrl} fluid className="rounded-3" alt="Cotton T-shirt" />
                    </Link>
                    </div>
                    ))}
                  </MDBCol>
            </MDBRow>           
          </MDBCardBody>

          <MDBCol md='12'>
          <button className="btn btn-primary" onClick={handleSubmit}>Update Idea</button>
          </MDBCol>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
    </>
        )
          }
}