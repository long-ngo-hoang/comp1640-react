import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useParams } from 'react-router-dom'
import { getUserById } from '../../redux/roleSlice'
import { updateRole } from '../../redux/roleSlice'
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

    const handleSubmit = async (event )=> {
        event.preventDefault();
       await dispatch(updateRole({userId: id, roleId: selectRole })
        ) 
        window.location.reload(false)

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