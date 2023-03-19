import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './addIdea.css'
import { useDispatch } from 'react-redux';
import SelectedBox from './selectedBox';
import { addIdea } from '../../redux/ideasSlice';
import UploadFile from '../../APIs/uploadFile';
import {  useNavigate  } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBSwitch,
    MDBTextArea
  } from 'mdb-react-ui-kit';
  import Navbar1 from '../navbar/navbar1';
export default function AddIdea() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [idea, setIdea] = useState({
        categoryId: "",
        name: "",
        description: "",
        isAnonymous: false
    });

    const [slectedCategories, setSelectedCategories] = useState('');
    const [optionList, setOptionList] = useState([]);
    
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

    const onChangeAnonymous = (value) => {
        setIdea((preV) => {
            return{...preV, isAnonymous: value}
        }) 
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addIdea(idea)
        ) 
        navigate(`/ideas/view`)
    }

    const[files, setFiles] = useState([{
        name: 'myFile.pdf'
    }])

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }
    
        return (
          <>
          <Navbar1 />
          <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Create Idea</h3>
            <h4>{idea.name}</h4>

             <MDBSwitch id='flexSwitchCheckDefault' label='Anonymous' onChange={onChangeAnonymous} checked={idea.isAnonymous} />
              <br />
            <MDBRow>
              {/* <BootstrapSwitchButton
                checked={idea.isAnonymous}
                width={100}
                onstyle="success"
                onlabel='Anonymous'
                // offlabel='Regular User'
                onChange={onChangeAnonymous} 
            /> */}
           
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