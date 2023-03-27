import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateCategory, selectCategoryById} from '../../redux/categoriesSlice'
import { useParams  } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody
} from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1';
import Alert from 'react-bootstrap/Alert'  
import { getCategoryById } from '../../redux/categoriesSlice';
import { Link } from 'react-router-dom'

export default function UpdateCategories() {
    const { id } = useParams()

    const dispatch = useDispatch()
    const {status , error} = useSelector((state => state.categories))
    const [show, setShow] = useState(true)

    useEffect(() => {
      dispatch(getCategoryById(id))     
    }, [])

    useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false)
      }, 3000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []); 
    const category = useSelector((state) => selectCategoryById(state, id))

    const [nameCategory, setNameCategory] = useState(category?.name);

    const onChangeName = (e) =>{
      setNameCategory(e.target.value)
    }

   const handleSubmit =  (e) => {
    if(nameCategory !== ''){
        e.preventDefault();
         dispatch(updateCategory({id: category.id ,name: nameCategory}))
    }  
  }

    if (!category) {
      return (
          <section>
              <h2>category not found!</h2>
          </section>
      )
  }
  const renderIdeas = (
    <>
            <MDBContainer fluid >
              <MDBRow className='justify-content-center align-items-center m-4'>
                    <MDBCard>
                      <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                        <div>
                        <h5 className="mb-0">
                          <MDBIcon fas icon="tasks" className="me-2" />
                          Ideas
                        </h5>
                        </div>
                      </MDBCardHeader>
                        <MDBCardBody>
                          <MDBTable className="mb-0">
                            <MDBTableHead>
                              <tr>
                                <th scope="col">Name</th> 
                                <th scope="col">Author</th>
                                <th scope="col">View</th>   
                                 <th scope="col">Actions</th>

                              </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                          {category === null 
                            ? <h1> page not have data</h1> :
                            category?.allIdeas?.ideas?.map(item =>
                              (   
                              <tr className="fw-normal" key={item.id}>
                                <td className="align-middle">
                                  <span>{item.name}</span>
                                </td>  
                                <td className="align-middle">
                                  <span>{item.author}</span>
                                </td>  
                                <td className="align-middle">
                                  <span>{item.viewCount}</span>
                                </td>  
                                <td className="align-middle">
                                <Link  type="button" className="btn btn-primary" to={`/ideas/detail/${item.id}`}>View More</Link>
                                </td>  
                              </tr>
                             ))}
                            </MDBTableBody>
                          </MDBTable>
                        </MDBCardBody>
                    </MDBCard>
                </MDBRow>
                </MDBContainer>
    </>
  );
        return (
          <>
            <Navbar1 />
            {error && show ? <div>    <Alert variant="success">{error}</Alert>  </div> : null}
           
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-4'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                   <MDBValidation className='row g-0'> 
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Category</h3>
                  <MDBRow>   
                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4'   id='form2' type='text' onChange={onChangeName}  value={nameCategory} required/>
                    </MDBCol>
                    <MDBCol md='12'>
                    {status === 'Success' &&  
                    <>
                      <p style={{color: "green"}}>Update Success</p>   
                      </>
                    }
                      <button className="btn btn-primary" type="submit" onClick={handleSubmit} value="Submit">Update Category</button>
                    </MDBCol>   
                    </MDBRow>  
  
                      </MDBValidation>
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
            {renderIdeas}
          </>
        )
}