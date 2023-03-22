import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByID } from '../../redux/roleSlice'
import { addUserToDepartment } from '../../redux/departmentsSlice'
import SelectedDepartment from './selectBox'


  const AddDepartmentToUser = () => { 
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectDepartment, setSelectDepartment] = useState('');
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )

    const onChangeSelected = (e) => {
        setSelectDepartment(e.target.value);
    }
    
    useEffect(()=>{
        dispatch(getUserByID(id),[]);
    },[])


    const handleSubmit = (event )=> {
        event.preventDefault();
    
        dispatch(addUserToDepartment({userId: id, departmentID: selectDepartment })
        ) 
        navigate(`/departments/viewUser`)
    }

    
    return (
      <>
       {/* <h1>{users.id}</h1> */}
       {loading && <h2>page loadding</h2>}

       <div>
            <label htmlFor="Role-choose"> Choose Role</label>
            <select
            disabled={false}
            value={selectDepartment}
            onChange={onChangeSelected} 
            >
            <SelectedDepartment/>
            </select>

            <button className='button' onClick={handleSubmit}>Add Roles</button>
         </div>
     
       {/* {!loading && users?
       
            
          : null 
       } */}
      </>
    )
  }

  export default AddDepartmentToUser;