import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './addIdea.css'
import { useDispatch } from 'react-redux';
import SelectedBox from './selectedBox';
import { addIdeaAsync } from '../../redux/ideasSlice';
import UploadFile from '../../APIs/uploadFile';
import {  useNavigate  } from 'react-router-dom';
export default function AddIdea() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [idea, setIdea] = useState({
        // academicYearId: "b6bce65a-e39c-4691-82c0-9809ea6e46ef",
        // departmentId: "63dd6da1-c392-40f9-8630-edb7265dd941",
        // userId: "5fca3a55-45f9-46a0-8b05-5696b0ac4d02",
        categoryId: "",
        name: "",
        description: "",
        // document: "",
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
    // const onChangeDocument = (e) =>{
    //     setIdea((preV) => {
    //         return{...preV, description: e.target.value}
    //     })
    // }
    const onChangeAnonymous = (value) => {
        setIdea((preV) => {
            return{...preV, isAnonymous: value}
        })
        
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addIdeaAsync(idea)
        ) 
        navigate(`/idea/view`)
  }


    const[files, setFiles] = useState([{
        name: 'myFile.pdf'
    }])

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }
    
        return (
          <>
            <form>
            <h1>Create Idea</h1>
            <div className='switch-btn'>
            <BootstrapSwitchButton 
                checked={idea.isAnonymous}
                width={100}
                onstyle="success"
                onlabel='Anonymous'
                // offlabel='Regular User'
                onChange={onChangeAnonymous} 
            />
            </div>
                <label htmlFor="name">Name:</label>
                <input onChange={onChangeName} value={idea.name}/>
                <label htmlFor="name">Description:</label>
                <textarea onChange={onChangeDescription} value={idea.description}/>
                <label htmlFor="cars">Choose categories:</label>
                    <select
                    disabled={false}
                    value={slectedCategories}
                    onChange={onChangeSelected} 
                        >
                            <SelectedBox/>
                            </select>
                <UploadFile/>
                {/* <input onChange={onChangeDocument} value={idea.description}/> */}
                <button className='button' onClick={handleSubmit}>Add Idea</button>
            </form>
            
          </>
        )
      
}