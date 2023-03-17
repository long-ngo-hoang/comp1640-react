import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPasswordAsync } from '../../redux/loginSlice';
import { useNavigate  } from 'react-router-dom';


export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    const [email, setEmail] = useState('')
    
    // console.log(email)
    const onChangeMail = (e) =>{
        
        setEmail(e.target.value)
    }


    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(forgotPasswordAsync(email)
        ) 
        // navigate(`/profile/view`)
    }

        return (
          <>
            <form>
            <h1>Forgot Pass</h1>
                <label htmlFor="email">Emai</label>
                <input onChange={onChangeMail} value={email}/>
                <button onClick={handleSubmit}> Confirm</button>
            </form>
          </>
        )
}