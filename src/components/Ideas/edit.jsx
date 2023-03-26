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
  MDBIcon,
  MDBValidation
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';
import './addIdea.css'
import { uploadFileToS3, getS3PreSignedUrl, uploadFile } from '../../redux/filesSlice';

export default function UpdateIdea() {

    const { id } = useParams()
     const dispatch = useDispatch();
     const ideaInDb = useSelector((state) => selectIdeaById(state, id))

     useEffect(()  => {
      dispatch(getIdeaById(id)) 
      }, [])
    
        const [idea, setIdea] = useState({
        id : id,
        categoryId: ideaInDb?.categoryId,
        name: ideaInDb?.name,
        description: ideaInDb?.description,
        isAnonymous: ideaInDb?.isAnonymous,
        documents: ideaInDb?.documents
    });

    const [slectedCategories, setSelectedCategories] = useState(ideaInDb?.categoryId); 
    const {files} = useSelector((state => state.files))

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
      if(idea.name && idea.description)
        event.preventDefault();
        await dispatch(updateIdea(idea))
        files.forEach(element =>  {
          dispatch(uploadFile({ideaId: id, documentUrl: element }))
        });  
    }

    const handleRemove = async (event )=> {
      await dispatch(deleteFile({id: event, ideaId:  id}))
      window.location.reload(false);
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
            <MDBValidation className='row g-3'> 

            <MDBRow>
              <MDBCol md='12'>
                <h6 className="mb-0">Name : </h6>
                <br/>
                <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangeName} value={idea.name}/>
              </MDBCol>

              <MDBCol md='12'>
                <h6 className="mb-0" >Description : </h6>
                <br/>
                <MDBTextArea wrapperClass='mb-4'  id='textAreaExample' rows={8} onChange={onChangeDescription} value={idea.description}/>
                
              </MDBCol>

              <MDBCol md='12'>
              <h6 className="mb-0">Category : </h6>
                    <select  style={{backgroundColor : "white"}}  disabled={false} value={slectedCategories} onChange={onChangeSelected}>
                      <SelectedBox/>
                    </select>
                <input type="file" id="files" style={{display: "none"}} onChange={handleUploadFile} />
                <label className='btn btn-primary'  htmlFor="files">Select file</label>              <hr class="hr" />

              </MDBCol>

              <MDBCol  md="2"  xl="2" style={{display: "flex", width: "100%"}}>
                  {ideaInDb.documents?.map(item=> (
                    <div key={item.id}>
                      <Link className="btn btn-outline-primary"  onClick={() => handleRemove(item.id)}> <MDBIcon icon="trash-alt" color="danger" /></Link> 
                      <br/>
                      <Link to={item.documentUrl}>
                      <MDBCardImage style={{height: "150px"}}   onClick={item.documentUrl}  key={item.id} src={item.documentUrl} fluid className="rounded-3" alt="Cotton T-shirt" />
                    </Link>
                    </div>
                    ))}
               </MDBCol>
               <MDBCol  md="2" lg="2" xl="2" style={{display: "flex", width: "100%"}}>
                  {files?.map(item=> (
                    <div key={item}>
                    <Link className="btn btn-outline-primary"  onClick={() => handleRemove(item)}> <MDBIcon icon="trash-alt" color="danger" /></Link> 
                    <br/>
                    <Link to={item}>
                    <MDBCardImage style={{height: "150px"}}  onClick={item}  key={item} src={item} fluid className="rounded-3" alt="Cotton T-shirt" />
                    </Link>
                    </div>
                  ))}
               </MDBCol>
            </MDBRow>   
          <MDBCol md='12'>
          <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Update Idea</button>
          </MDBCol>       
            </MDBValidation>  
          </MDBCardBody>

     
        </MDBCard>
      </MDBRow>
    </MDBContainer>
    </>
        )
          }
}