import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addAcademicYear} from '../../redux/academicYearsSlice'
import {  useNavigate  } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {
  MDBCol,
  MDBInput,
  MDBContainer,
  MDBRow
} from "mdb-react-ui-kit";
import Navbar1 from '../navbar/navbar1';
export default function AddAcademicYears() {
  
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [academicYear, setAcademicYear] = useState({
        name: '',
        startDate: new Date(),
        closureDate: new Date(),
        finalClosureDate: new Date(),
    });
  
    let startDate = moment(academicYear.startDate).format('YYYY-MM-DDTHH:mm:ss');
    let closureDate = moment(academicYear.closureDate).format('YYYY-MM-DDTHH:mm:ss');
    let finalClosureDate = moment(academicYear.finalClosureDate).format('YYYY-MM-DDTHH:mm:ss');

    const onChangeName = (e) =>{
      setAcademicYear((preV) => {     
            return{...preV, name: e.target.value}
        })
    }

    const onChangeStartDate = (date) =>{
      setAcademicYear((preV) => {
            return{...preV, startDate: date}
        })
    }

    const onChangeClosureDate = (date) =>{
      setAcademicYear((preV) => {
            return{...preV, closureDate: date}
        })
    }

    const onChangeFinalClosureDate = (date) =>{
      setAcademicYear((preV) => {
            return{...preV, finalClosureDate: date}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(addAcademicYear({
            name: academicYear.name,
           StartDate: startDate, 
           ClosureDate: closureDate, 
           FinalClosureDate: finalClosureDate
          })
        ) 
        navigate(`/academicyears/view`)
    }  

        return (
          <>
          <Navbar1/>
          <MDBContainer fluid>
          <MDBRow className='justify-content-center align-items-center m-1'>

            <div className="container" >
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h2>Create AcademicYear</h2>
                </div>
                <div className="card-body">
                  <form >
                    <div className="text-danger"></div>

                    <div className="form-outline mb-4">
                      <MDBCol md='12'>
                        <label className="mb-2" >Name</label>
                        <MDBInput   id='form2' type='text' onChange={onChangeName} value={academicYear.name}/>
                      </MDBCol>
                      <br/>

                      <MDBCol md='12' >
                        <span className="text-danger"></span>
                        <label  className="control-label">Start Time</label>
                        <DatePicker 
                          selected={academicYear.startDate}
                          onChange={onChangeStartDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="dd-MM-yyyy HH:mm"
                        />
                      </MDBCol>
                      <br/>
                      <MDBCol md='12'>
                        <span className="text-danger"></span>
                        <label className="mb-2">Closure Date</label>
                        <DatePicker
                          selected={academicYear.closureDate}
                          onChange={onChangeClosureDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="dd-MM-yyyy HH:mm"
                        />
                      </MDBCol>
                      <br/>

                      <MDBCol md='12'>
                        <span className="text-danger"></span>
                        <label  className="mb-2">Final Closure Date</label>
                        <DatePicker
                          selected={academicYear.finalClosureDate}
                          onChange={onChangeFinalClosureDate}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="dd-MM-yyyy HH:mm"
                        />
                      </MDBCol>
                    </div>
                    <MDBCol md='12'>
                      <button className="btn btn-primary" onClick={handleSubmit}>Add Academic Year</button>
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