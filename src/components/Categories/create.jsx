import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/categoriesSlice'
import {  useNavigate  } from 'react-router-dom';
import {
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import Navbar1 from '../navbar/navbar1';

export default function AddCategories() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [categories, setCategories] = useState('');
    
    const onChangeName = (e) =>{
        setCategories(e.target.value);
    }

    const handleSubmit = async (e)=> {
        dispatch(addCategory({name: categories}))
        navigate(`/categories/view`)
    }  
    return (
      <>
        <Navbar1/>
        <MDBContainer fluid>
          <MDBRow className='justify-content-center align-items-center m-5'>
            <div className="container" >
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h2>Create Categories</h2>
                </div>
                <div className="card-body">
                  <form >
                    <div className="text-danger"></div>
                    <div className="form-outline mb-4">
                      <MDBCol md='12'>
                        <label className="mb-2" >Name</label>
                        <MDBInput  id='form2' type='text' onChange={onChangeName} value={categories.name}/>
                      </MDBCol>
                    </div>
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleSubmit}>Create Category</button>
                    </MDBCol>
                  </form>
                </div>
              </div>
            </div>
          </MDBRow>
        </MDBContainer>
      </>
    )   
}