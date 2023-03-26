import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { registerUser } from '../../redux/accountsSlice.js';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBValidation,
  }
  from 'mdb-react-ui-kit';
import Navbar1 from '../navbar/navbar1.jsx';
  import Alert from 'react-bootstrap/Alert' 

export default function Register() {
    const dispatch = useDispatch();
   
    const [users, setUsers] = useState({
        email: '',
        password: '',
        comfirmPassword: ''
    });
    const {status , error, loading} = useSelector((state => state.accounts))
    console.log(error)
    const onChangeEmail = (e) =>{
        setUsers((preV) => {     
            return{...preV, email: e.target.value}
        })
    }

    const onChangePassword = (e) =>{
        setUsers((preV) => {
            return{...preV, password: e.target.value}
        })
    }

    const onChangeComfirmPassword = (e) =>{
      setUsers((preV) => {
          return{...preV, comfirmPassword: e.target.value}
      })
  }


    const [show, setShow] = useState(true)   

    const handleSubmit = (event )=> {
      if(users.email   && users.password  && users.comfirmPassword  && users.comfirmPassword === users.password){
        event.preventDefault();
        dispatch(registerUser(users)
        ) 
      }
    }
    useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false)
      }, 10000)
  
      return () => {
        clearTimeout(timeId)
      }
    }, []);
        return (
          <>
          <Navbar1/>
   <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>
  {error && show ? <div>  
      <Alert variant="success">{error}</Alert>  
      </div> : null
  }
    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        <h2 className="fw-bold mb-2 text-center">Create Account</h2>
        <br/>
        {error? <div style={{color: "red"}}> {error}, Please use another email </div> : null}
        {status === 'Success' &&  
                    <>
                      <p style={{color: "green"}}>Create Success</p>   
                      </>
                    }
        <MDBValidation className='row g-0'> 

        <h6>Email: </h6>
        <MDBInput wrapperClass='mb-4 w-100'  id='formControlLg1' type='text'  value={users.email} onChange={onChangeEmail} required />

        <h6>Password: </h6>
        <MDBInput wrapperClass='mb-4 w-100' id='formControlLg2' type='password'  value={users.password} onChange={onChangePassword} required/>

        <h6>Comfirm Password: </h6>
        <MDBInput id='formControlLg2' type='password'  value={users.comfirmPassword} onChange={onChangeComfirmPassword} required/>


        <hr className="my-4" />

        <button type='submit' className='btn btn-primary' style={{marginBottom: "10px"}} size='lg' onClick={handleSubmit}>
          Create Account
        </button>
      </MDBValidation>
      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
          </>
        )
}