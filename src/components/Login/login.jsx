import React, { useState , useEffect} from 'react';
import './login.css';
import { useNavigate  } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { login } from '../../redux/accountsSlice';
import { Link } from 'react-router-dom'
// import RequireAuth from '../../authorization';
import {MDBContainer, MDBCol, MDBRow, MDBInput, MDBCheckbox, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import jwt_decode from "jwt-decode";


export function LogIn (){
    const dispatch = useDispatch()   
     const navigate = useNavigate()

    const [account, setAccount] = useState({
        email: "",
        password: "",
    });


    const handleEmail = (e) =>{
        console.log(e.target.value)
        setAccount((preV) => {
            return{...preV, email: e.target.value}
        })
    }
    
    const handlePassword = (e) =>{
        setAccount((preV) => {
            return{...preV, password: e.target.value}
        })
    }

    const handleLogin = () =>{
        dispatch(login(account), 10000)
    }

    const {status} = useSelector((state => state.accounts))

    useEffect(() => {
        if(status === 'success'){
          const token = localStorage.getItem('token')
   
          const decodedToken = jwt_decode(token); 
          if(decodedToken !== undefined){

          
          if (decodedToken.Roles === "Staff"){

              navigate('/ideas/view') 
          }
          else if (decodedToken.Roles === "Administrator"){
             navigate('/departments/view') 
          }
          else if (decodedToken.Roles === "Quality Assurance Manager"){
             navigate('/categories/view') 
          }
          else if(decodedToken.Roles === "Quality Assurance Coordinator"){
              navigate('/ideas/view') 
          }
        }  
        }
      })

return(
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>
            <h2 className="fw-bold mb-2 text-center">Sign in</h2>
            <p className="text-white-50 mb-3">Please enter your login and password!</p>

            <h6>Email: </h6>
            <MDBInput wrapperClass='mb-4 w-100'  id='formControlLg1' type='email'  value={account.email} onChange={handleEmail}  size="lg"/>

            <h6>Password: </h6>
            <MDBInput wrapperClass='mb-4 w-100' id='formControlLg2' type='password' size="lg" value={account.password} onChange={handlePassword}/>

            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
            <hr className="my-4" />

            <button className='btn btn-primary' style={{marginBottom: "10px"}} size='lg' onClick={handleLogin}>
              Login
            </button>


             <Link className='btn btn-primary' to={`/ForgotPassword`}>Forgot Password</Link>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
);
}