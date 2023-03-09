import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useDispatch } from 'react-redux';
import {addCommentAsync} from '../../redux/commentsSlice'
import {  useNavigate  } from 'react-router-dom';

export function AddComments() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [Comments, setComments] = useState({
        userId: "5fca3a55-45f9-46a0-8b05-5696b0ac4d02",
        ideaID: "835294b7-f98e-4869-8a88-392f45e099bb",
        content: "",
        isAnonymous: false
    });
    const onChangeName = (e) =>{
        setComments((preV) => {     
            return{...preV, content: e.target.value}
        })
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        console.log(Comments)
        dispatch(addCommentAsync(Comments)
        ) 

        navigate(`/idea/view`)
  }  

        return (
          <>
               <div className="container" >
  
  <div className="card mb-4">
    <div className="card-header py-3">
    <h2>Add Categories</h2>
     
    </div>
    <div className="card-body">
      <form >
        <div className="text-danger"></div>

        <div className="form-outline mb-4">
          <label  className="control-label">Category</label>
                <input onChange={onChangeName} value={Comments.content}/>
              <span className="text-danger"></span>
        </div>

        
        <div className="form-outline mb-4">
        <button onClick={handleSubmit}>Add Comment</button>
          
        </div>
      </form>
    </div>
  </div>
</div>
            {/* <form>
            <h1>Create addCategories</h1>
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
                <UploadFile/>
                <label> Document</label>
                <input onChange={onChangeDocument} value={idea.document}/>
                <button onClick={handleSubmit}>Add Idea</button>
            </form> */}
            
          </>
        )
      
}