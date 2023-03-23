import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams, useNavigate  } from 'react-router-dom';
import { updateAcademicYear, selectAcademicYearById, getAcademicYearById} from '../../redux/academicYearsSlice'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardHeader,
  MDBIcon,
  MDBTable,
  MDBTableHead,MDBTableBody
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'

import Navbar1 from '../navbar/navbar1';

export default function UpdateAcademicYear() {
    const { id } = useParams();

    const academicYear = useSelector((state) => selectAcademicYearById(state, id))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState(academicYear?.name);
    
    const onChangeName = (e) =>{
        setName(e.target.value);
    }
    useEffect(() => {
      dispatch(getAcademicYearById(id))     
    }, [])

   const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(updateAcademicYear({id: id, name: name})
        ) 
        navigate(`/academicYears/view`)
  }  

  const renderIdeas = (
    <>
            <MDBContainer fluid >
              <MDBRow className='justify-content-center align-items-center m-5'>
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
                              </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                          {academicYear === null 
                            ? <h1> page not have data</h1> :
                            academicYear?.allIdeas?.ideas?.map(item =>
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
            <MDBContainer fluid>
              <MDBRow className='justify-content-center align-items-center m-5'>
              <MDBCard>
                <MDBCardBody className='px-4'>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Update Academic Year</h3>
                  <MDBRow>   
                    <MDBCol md='12'>
                      <label className="mb-0">Name</label>
                      <MDBInput wrapperClass='mb-4'  id='form2' type='text' onChange={onChangeName} value={name}/>
                    </MDBCol>
                  </MDBRow>  
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleSubmit}>Update Academic Year</button>
                    </MDBCol>        
                </MDBCardBody>
              </MDBCard>
              </MDBRow>
            </MDBContainer>
            {renderIdeas}
          </>
        )
      
}