import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByID } from '../../redux/roleSlice'
import { updateRoleAsync } from '../../redux/roleSlice'
import SelectedRole from './selectedBox'


  const AddRoles = () => { 
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectRole, setSelectRole] = useState('');
    const {loading,error, users }=  useSelector(
        (state) => state.roles
        )
    
        console.log(users)
    const onChangeSelected = (e) => {
        setSelectRole(e.target.value);
    }
    
    useEffect(()=>{
        dispatch(getUserByID(id),[]);
    },[])


    const handleSubmit = (event )=> {
        event.preventDefault();
    
        dispatch(updateRoleAsync({userId: id, roleId: selectRole })
        ) 
        navigate(`/role/view`)
    }

    
    return (
      <>
       {/* <h1>{users.id}</h1> */}
       {loading && <h2>page loadding</h2>}

       <div>
            <label htmlFor="Role-choose"> Choose Role</label>
            <select
            disabled={false}
            value={selectRole}
            onChange={onChangeSelected} 
            >
            <SelectedRole/>
            </select>

            <button className='button' onClick={handleSubmit}>Add Roles</button>
         </div>
     
       {/* {!loading && users?
       
            
          : null 
       } */}
      </>
    )
  }

  export default AddRoles;