import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addCategoryAsync} from '../../redux/categoriesSlice'
import {  useNavigate  } from 'react-router-dom';
export default function AddCategories() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [categories, setCategories] = useState('');
    
    const onChangeName = (e) =>{
        setCategories(e.target.value);
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addCategoryAsync({name: categories})
        ) 
        navigate(`/category/view`)
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
                <input onChange={onChangeName} value={categories.name}/>
              <span className="text-danger"></span>
        </div>

        
        <div className="form-outline mb-4">
        <button onClick={handleSubmit}>Add Idea</button>
          
        </div>
      </form>
    </div>
  </div>
</div>
            
            
          </>
        )
      
}