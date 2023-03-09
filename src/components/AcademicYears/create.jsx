import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addCategoryAsync} from '../../redux/categoriesSlice'
import {  useNavigate  } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddAcademicYears() {
  
     const dispatch = useDispatch();
     const navigate = useNavigate()
    const [academicYears, setAcademicYears] = useState({
        name: '',
        startDate: new Date(),
        closureDate: new Date(),
        finalClosureDate: new Date(),
    });
    // 
    const onChangeName = (e) =>{
        setAcademicYears((preV) => {     
            return{...preV, name: e.target.value}
        })
    }

    const onChangeStartDate = (date) =>{
        setAcademicYears((preV) => {
            return{...preV, startDate: date}
        })
        console.log( date);
    }

    const onChangeClosureDate = (date) =>{
        setAcademicYears((preV) => {
            return{...preV, closureDate: date}
        })
    }

    const onChangeFinalClosureDate = (date) =>{
        setAcademicYears((preV) => {
            return{...preV, finalClosureDate: date}
        })
    }

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addCategoryAsync({AddAcademicYears})
        ) 
        navigate(`/category/view`)
  }  

        return (
          <>
               <div className="container" >
  
  <div className="card mb-4">
    <div className="card-header py-3">
    <h2>Add AcademicYear</h2>
     
    </div>
    <div className="card-body">
      <form >
        <div className="text-danger"></div>

        <div className="form-outline mb-4">
          <label  className="control-label">Name</label>
                <input onChange={onChangeName} value={academicYears.name}/>
              <span className="text-danger"></span>
              <label  className="control-label">Start Time</label>
              <DatePicker
                    selected={academicYears.startDate}
                    onChange={onChangeStartDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="dd-MM-yyyy HH:mm"
                />
              <span className="text-danger"></span>
              <label  className="control-label">Closure Date</label>
              <DatePicker
                    selected={academicYears.closureDate}
                    onChange={onChangeClosureDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="dd-MM-yyyy HH:mm"
                />
              <span className="text-danger"></span>
              <label  className="control-label">Final Closure Date</label>
              <DatePicker
                selected={academicYears.finalClosureDate}
                onChange={onChangeFinalClosureDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="dd-MM-yyyy HH:mm"
            />
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