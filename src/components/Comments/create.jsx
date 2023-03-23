import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import {addComment} from '../../redux/commentsSlice'
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
        // event.preventDefault();
        // dispatch(addComment(Comments)
        // ) 
        // navigate(`/idea/view`)
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
          
        </div>
      </form>
    </div>
  </div>
</div>     
          </>
        )
      
}