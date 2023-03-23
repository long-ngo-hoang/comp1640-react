import React, { useState } from 'react';
import './addIdea.css'
import { useDispatch, useSelector } from 'react-redux';
import SelectedBox from './selectedBox';
import { addIdea } from '../../redux/ideasSlice';
import {  useNavigate, Link  } from 'react-router-dom';
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
  } from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';
import { useEffect } from 'react';
import { uploadFileToS3 } from '../../redux/filesSlice';
import { getS3PreSignedUrl } from '../../redux/filesSlice';
import { uploadFile, deleteFile } from '../../redux/filesSlice';
export default function AddIdea() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [idea, setIdea] = useState({
        categoryId: "",
        name: "",
        description: "",
        isAnonymous: false
    });
    const {status} = useSelector((state => state.ideas))
    const [slectedCategories, setSelectedCategories] = useState('');
    const {files} = useSelector((state => state.files))
    console.log(files)
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

    const onChangeAnonymous = (e) => {
        setIdea((preV) => {
            return{...preV, isAnonymous: !idea.isAnonymous}
        }) 
    }

   const handleSubmit = async (event )=> {
        event.preventDefault();
        const newIdea = await dispatch(addIdea(idea))  
        files.forEach(element =>  {
          dispatch(uploadFile({ideaId: newIdea.payload.id, documentUrl: element }))
        });
    }

    const handleRemove = async (event )=> {
      console.log(event)
     dispatch(deleteFile(event))
  }

    const handleUploadFile = async (e)  =>{
      await dispatch(getS3PreSignedUrl())  
      const url = localStorage.getItem('url')

      if(url !== null){
        dispatch(uploadFileToS3({url: url, data:  e.target.files[0]}))      
        localStorage.removeItem('url')
      }
    }

    useEffect(() => {
      if(status === 'success'){
        navigate('/ideas/view') 
      }
    })

    return (
      <>
      <Navbar1 />
      <MDBContainer fluid >
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard style={{backgroundColor: "#eee"}}>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Create Idea</h3>
             <MDBSwitch id='flexSwitchCheckDefault' label='Anonymous' onChange={onChangeAnonymous} checked={idea.isAnonymous} value={idea.isAnonymous} />
              <br />
            <MDBRow>
              <MDBCol md='12'>
                <h5 className="mb-0">Name : </h5>
                <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='text' onChange={onChangeName} value={idea.name}/>
              </MDBCol>

              <MDBCol md='12'>
                <h5 className="mb-0">Description : </h5>
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
              <MDBCol  md="2" lg="2" xl="2" style={{display: "flex", width: "100%"}}>
                  {files?.map(item=> (
                    <div>
                    <Link className="btn btn-outline-primary"  onClick={() => handleRemove(item)}> <MDBIcon icon="trash-alt" color="danger" /></Link> 
                    <br/>
                    <Link to={item}>
                    <MDBCardImage style={{height: "150px"}}  onClick={item}  key={item} src={item} fluid className="rounded-3" alt="Cotton T-shirt" />
                    </Link>
                    </div>
                  ))}
               </MDBCol>
            </MDBRow>           
          </MDBCardBody>
          <MDBCol md='12'>
            <button className="btn btn-primary" onClick={handleSubmit}>Create Idea</button>
          </MDBCol>

          
        </MDBCard>
      </MDBRow>
      </MDBContainer>
          </>
        )
}