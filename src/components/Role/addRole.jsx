import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../redux/roleSlice'
import { updateRoleAsync } from '../../redux/roleSlice'
import SelectedRole from './selectedBox'
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from 'mdb-react-ui-kit';

  const AddRoles = () => { 
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectRole, setSelectRole] = useState('');
    const {loading, users }=  useSelector(
        (state) => state.roles
        )
    
    const onChangeSelected = (e) => {
        setSelectRole(e.target.value);
    }
    
    useEffect(()=>{
        dispatch(getUserById(id),[]);
    },[])

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(updateRoleAsync({userId: id, roleId: selectRole })
        ) 
        navigate(`/role/view`)
    }

    return (
      <>
       {loading && <h2>page loadding</h2>}
       <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Roles: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <select
                      disabled={false}
                      value={selectRole}
                      onChange={onChangeSelected}>
                      <SelectedRole/>
                    </select>                  
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              </MDBCard>     
        <button className='btn btn-primary' onClick={handleSubmit}>Add Roles</button>

      </>
    )
  }

  export default AddRoles;