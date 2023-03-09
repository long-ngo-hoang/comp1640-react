import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addDepartmentsAsync} from '../../redux/departmentsSlice'
import {  useNavigate  } from 'react-router-dom';


export default function AddDepartments() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [name, setName] = useState('');
    
    const onChangeName = (e) =>{
        setName(e.target.value);
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addDepartmentsAsync({name})
        ) 
        navigate(`/departments/view`)
  }  

        return (
          <>
               <div className="container" >
  
  <div className="card mb-4">
    <div className="card-header py-3">
    <h2>Add Department</h2>
     
    </div>
    <div className="card-body">
      <form >
        <div className="text-danger"></div>

        <div className="form-outline mb-4">
          <label  className="control-label">Category</label>
                <input onChange={onChangeName} value={name}/>
              <span className="text-danger"></span>
        </div>

        
        <div className="form-outline mb-4">
        <button onClick={handleSubmit}>Add Departments</button>
          
        </div>
      </form>
    </div>
  </div>
</div>
            
            
          </>
        )
      
}