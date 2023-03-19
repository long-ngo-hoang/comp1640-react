import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SelectedBox from './selectedBox';
import { updateIdea, getIdeaById } from '../../redux/ideasSlice';
import { selectIdeaById } from '../../redux/ideasSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
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
import './addIdea.css'
    export default function UpdateIdea() {

    const { id } = useParams()
     const dispatch = useDispatch();
     const navigate = useNavigate()
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
        isAnonymous: ideaInDb?.isAnonymous
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

    const onChangeDocument = (e) =>{
        setIdea((preV) => {
            return{...preV, document: e.target.value}
        })
    }

    const onChangeAnonymous = () => {
        setIdea((preV) => {
            return{...preV, isAnonymous: !idea.isAnonymous}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(updateIdea(idea)
        ) 
    }

    const[files, setFiles] = useState([{
        name: 'myFile.pdf'
    }])

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    if (!ideaInDb) {
      
        return <div className="loader" />;
      
  }

  else{
        return (
          <>
          <Navbar1 />
    <MDBContainer fluid>
      <MDBRow className='justify-content-center align-items-center m-5'>
        <MDBCard>
          <MDBCardBody className='px-4'>
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Idea</h3>
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
          <button className="btn btn-primary" onClick={handleSubmit}>Update Idea</button>
          </MDBCol>
        </MDBCard>
      </MDBRow>
</MDBContainer>
          </>
        )
          }
}