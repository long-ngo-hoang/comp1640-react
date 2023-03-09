import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCategoryAsync} from '../../redux/categoriesSlice'
import { useParams, useNavigate  } from 'react-router-dom';
import {selectCategoryById} from '../../redux/categoriesSlice'
export default function UpdateCategories() {
    const { Id } = useParams()

    const category = useSelector((state) => selectCategoryById(state,Id))
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [nameCategories, setNameCategories] = useState(category?.name);
  
    const onChangeName = (e) =>{
        setNameCategories(e.target.value)
        
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(updateCategoryAsync({id: category.id ,name: nameCategories})
        ) 
        navigate(`/category/view`)
  }  

        return (
          <>   
               <div className="container" >
  
  <div className="card mb-4">
    <div className="card-header py-3">
    
    <h2>Update Categories</h2>
    </div>
    <div className="card-body">
      <form >
        <div className="text-danger"></div>

        <div className="form-outline mb-4">
          <label  className="control-label">Category</label>
                <input onChange={onChangeName} value={nameCategories}/>               
             
        </div>
        <div className="form-outline mb-4">
        <button onClick={handleSubmit}>Update Idea</button>
          
        </div>
      </form>
    </div>
  </div>
</div>
          </>
        )
      
}