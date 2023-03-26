import React,  {useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getCategories} from '../../redux/categoriesSlice'
import {selectAllCategories} from '../../redux/categoriesSlice'
import {deleteCategory} from '../../redux/categoriesSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import Navbar1 from "../navbar/navbar1";
// import {NotificationContainer, NotificationManager} from 'react-notifications';
import Alert from 'react-bootstrap/Alert'  

const ViewCategories = () => {
  const [show, setShow] = useState(true)

 const dispatch = useDispatch()
 const {status , error} = useSelector((state => state.categories))
 
 useEffect(() => {
    dispatch(getCategories())     
  }, [])
  
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  const categoriesInDb = useSelector(selectAllCategories)
 
  const handleRemove = async (id) => {
   await dispatch(deleteCategory(id));
  //  window.location.reload(false)
  }

  return (
    <>
        <Navbar1/>
        {error && show ? <div>    <Alert variant="success">Cannot delete categories</Alert>  </div> : null}
        <section className="gradient-custom-2 vh-100">
        
                    <MDBContainer className="py-5 h-100">
                      <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol md="12" xl="10">
                          <MDBCard>
                            <MDBCardHeader className="p-3" style={{display: "flex", justifyContent: "space-between"}}>
                              <div>
                              <h5 className="mb-0">
                                <MDBIcon fas icon="tasks" className="me-2" />
                                Categories
                              </h5>
                              </div>
                              <div>
                              <Link type="button" className="btn btn-primary" to={`/categories/create`}>
                                  Create Categories
                              </Link>
                              </div>
                            </MDBCardHeader>
                              <MDBCardBody>
                                <MDBTable className="mb-0">
                                  <MDBTableHead>
                                    <tr>
                                      <th scope="col">Name</th> 
                                      <th scope="col">Actions</th>
                                    </tr>
                                  </MDBTableHead>
                                  <MDBTableBody>
                                {categoriesInDb === null 
                                  ? <h1> page not have data</h1> :
                                  categoriesInDb?.map(item =>
                                    (   
                                    <tr className="fw-normal" key={item.id}>
                                      <td className="align-middle">
                                        <span>{item.name}</span>
                                      </td>  
                                      <td className="align-middle">

                                      <button style={{background: "none", border: "none"}}>
                                        <Link to={`/categories/edit/${item.id}`}>
                                          <MDBIcon
                                            fas
                                            icon="edit"
                                            color="success"
                                            size="lg"
                                            className="me-3"
                                          />
                                          </Link>
                                        </button>
                                        <button style={{background: "none", border: "none"}} onClick={() => handleRemove(item.id)}>
                                          <MDBIcon
                                            fas
                                            icon="trash-alt"
                                            color="danger"
                                            size="lg"
                                            className="me-3"
                                          />
                                          </button>
                                      </td>
                                    </tr>
                                   ))}
                                  </MDBTableBody>
                                </MDBTable>
                              </MDBCardBody>
                          </MDBCard>
                        </MDBCol>
                      </MDBRow>
                    </MDBContainer>
                  </section>
</>
  )
}

export default ViewCategories;