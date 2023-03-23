import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCategory, selectCategoryById} from '../../redux/categoriesSlice'
import { useParams, useNavigate  } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';
import {getCategoryById} from '../../redux/categoriesSlice'


export default function UpdateCategories() {
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()


  
     
    const category = useSelector((state) => selectCategoryById(state, id))

    const [nameCategory, setNameCategory] = useState(category?.name);

    const onChangeName = (e) =>{
      setNameCategory(e.target.value)
    }

   const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateCategory({id: category.id ,name: nameCategory}))
        navigate(`/categories/view`)
    }  

    if (!category) {
      return (
          <section>
              <h2>category not found!</h2>
          </section>
      )
  }

        return (
          <>
            <Navbar1 />
            <form onSubmit={handleSubmit}>

            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-5'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Category</h3>
                  <MDBRow>   
                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4'   id='form2' type='text' onChange={onChangeName}  value={nameCategory}/>
                    </MDBCol>
                  </MDBRow>  
                    <MDBCol md='12'>
                      <button className="btn btn-primary" type="submit" value="Submit">Update Category</button>
                    </MDBCol>        
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
            </form>

          </>
        )
}