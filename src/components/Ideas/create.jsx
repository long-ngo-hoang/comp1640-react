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
    MDBAccordion,
    MDBAccordionItem,
    MDBValidation,
    MDBSpinner,
    MDBValidationItem,
    MDBCheckbox
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
    const [termsAndContract, setTermsAndContract] = useState(false)

    let {loading, status, error} = useSelector((state => state.ideas))
    const [slectedCategories, setSelectedCategories] = useState('');
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

    const onChangeAnonymous = (e) => {
        setIdea((preV) => {
            return{...preV, isAnonymous: !idea.isAnonymous}
        }) 
    }

    const onChangeTermsAndContract = (e) => {
      setTermsAndContract(!termsAndContract) 
    }

   const handleSubmit = async (event )=> {     
    if(termsAndContract === true && idea.categoryId && idea.name && idea.description){
        event.preventDefault();
        const newIdea = await dispatch(addIdea(idea))  
        files.forEach(element =>  {
          dispatch(uploadFile({ideaId: newIdea.payload.id, documentUrl: element }))
        });
      }  
    }

    const handleRemove = async (event )=> {
     await dispatch(deleteFile(event))
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
      <MDBRow className='justify-content-center align-items-center m-3'>
        <MDBCard >            
            <MDBValidation className='row g-3'> 

          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Create Idea</h3>
             <MDBSwitch id='flexSwitchCheckDefault' label='Anonymous' onChange={onChangeAnonymous} checked={idea.isAnonymous} value={idea.isAnonymous} />
              <br />

            <MDBRow>
              <MDBCol md='12'>
                <MDBInput wrapperClass='mb-4'   id='form2' type='text' onChange={onChangeName} value={idea.name} placeholder="Name Idea" required/>
              </MDBCol>
              <MDBCol md='12'>
                <MDBTextArea wrapperClass='mb-4'  id='textAreaExample' rows={8} onChange={onChangeDescription} value={idea.description}  placeholder="Descriptions Idea" required/>
              </MDBCol>
              <MDBCol md='12' style={{display: "flex", justifyContent: "space-around"}}>
                    <select  disabled={false} value={slectedCategories} onChange={onChangeSelected} style={{backgroundColor : "white"}} required> 
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
               
               <MDBAccordion initialActive={1}>
                  <MDBAccordionItem collapseId={1} headerTitle='Terms And Conditions'>
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                    plugin adds the appropriate classes that we use to style each element. These classes control the overall
                    appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
                    custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
                    within the <code>.accordion-body</code>, though the transition does limit overflow.    
                    <hr class="hr" />
                    <MDBValidationItem className='col-12' feedback='You must agree before submitting.' invalid>
                        <MDBCheckbox label='Agree to terms and conditions' id='invalidCheck'  onChange={onChangeTermsAndContract} checked={termsAndContract} value={termsAndContract}  required />
                    </MDBValidationItem>         
                  </MDBAccordionItem>
                </MDBAccordion>
            </MDBRow>                 
          <br/>  
          {loading &&  <MDBSpinner role='status'>
                <span className='visually-hidden'>Loading...</span>
              </MDBSpinner>}
              {error &&    
                <p style={{color: "red"}}>{error}</p>
              }   
              <br/>
            <button type='submit' className="btn btn-primary" onClick={handleSubmit}>Create Idea</button>
          </MDBCardBody>
          </MDBValidation>

                      
          
        </MDBCard>
      </MDBRow>
      </MDBContainer>
          </>
        )
}