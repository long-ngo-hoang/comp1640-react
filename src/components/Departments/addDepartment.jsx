import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../../redux/roleSlice'
import { addUserToDepartment } from '../../redux/departmentsSlice'
import SelectedDepartment from './selectBox'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardText,
} from 'mdb-react-ui-kit';

  const AddDepartmentToUser = () => { 
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectDepartment, setSelectDepartment] = useState('');
    const {loading }=  useSelector((state) => state.roles)
        
    const onChangeSelected = (e) => {
        setSelectDepartment(e.target.value);
    }
    
    useEffect(()=>{
        dispatch(getUserById(id),[]);
    },[])


    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addUserToDepartment({userId: id, departmentID: selectDepartment })
        ) 
    }

    
    return (
      <>
       {loading && <h2>page loadding</h2>}
       <MDBCard className="mb-4">
            <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Departments: </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <select
                    disabled={false}
                    value={selectDepartment}
                    onChange={onChangeSelected}>
                    <SelectedDepartment/>
                  </select>                
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              </MDBCard>     
         <button className='btn btn-primary' onClick={handleSubmit}>Add Department</button>
      </>
    )
  }

  export default AddDepartmentToUser;