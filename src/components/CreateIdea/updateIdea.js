import React, { useState, useEffect } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './addIdea.css'
import { useDispatch } from 'react-redux';
import SelectedBox from '../../APIs/selectedBox';
import { updateIdeaAsync } from '../../redux/ideasSlice';
import { selectIdeaById } from '../../redux/ideasSlice';
import { useParams, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux'

    export default function UpdateIdea() {

    const { postId } = useParams()
    
     const dispatch = useDispatch();
     const navigate = useNavigate()
     const post = useSelector((state) => selectIdeaById(state,postId))

        const [idea, setIdea] = useState({
        id: post.id,
        academicYearId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        userId: "3fe9366b-8a12-448f-816a-cfc7115bb08b",
        categoryId: "",
        name: post?.name,
        description: "",
        // document: "",
        isAnonymous: post?.isAnonymous
    });

    const [slectedCategories, setSelectedCategories] = useState(post?.categoryId); 
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

    const onChangeAnonymous = (value) => {
        setIdea((preV) => {
            return{...preV, isAnonymous: value}
        })
        
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        console.log(idea);
        dispatch(updateIdeaAsync(idea)
        ) 
        navigate(`/idea/${postId}`)
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
            <h1>Update Idea</h1>
            <BootstrapSwitchButton
                checked={idea.isAnonymous}
                width={100}
                onstyle="success"
                onlabel='Anonymous'
                // offlabel='Regular User'
                onChange={onChangeAnonymous} 
            />
                <label htmlFor="name">Name</label>
                <input onChange={onChangeName} value={idea.name}/>
                <label htmlFor="name">Description</label>
                <input onChange={onChangeDescription} value={idea.description}/>
                <label htmlFor="cars">Choose categories:</label>
                    <select
                    disabled={false}
                    value={slectedCategories}
                    onChange={onChangeSelected} 
                        >
                            <SelectedBox/>
                            </select>
                <label> Document</label>
                <input onChange={onChangeDocument} value={idea.document}/>
                <button onClick={handleSubmit}>Update Idea</button>
            </form>
          </>
        )
}