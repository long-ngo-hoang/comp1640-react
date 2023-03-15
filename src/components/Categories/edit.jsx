import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCategoryAsync} from '../../redux/categoriesSlice'
import { useParams, useNavigate  } from 'react-router-dom';
import {selectCategoryById} from '../../redux/categoriesSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';

export default function UpdateCategories() {
    const { Id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const category = useSelector((state) => selectCategoryById(state,Id))

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
            <Navbar1 />
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-5'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Category</h3>
                  <MDBRow>   
                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4'  size='lg' id='form2' type='text' onChange={onChangeName} value={nameCategories}/>
                    </MDBCol>
                  </MDBRow>  
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleSubmit}>Update Category</button>
                    </MDBCol>        
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
          </>
        )
}