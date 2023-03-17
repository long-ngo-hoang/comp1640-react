import React, { useState } from 'react';
import './login.css';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../redux/loginSlice';
import { Link } from 'react-router-dom'


export function LogIn (){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[eye,seteye]=useState(true);
    const[inpass,setinpass]=useState("password");
     const[warning,setwarning]=useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || ""
     const[inputText,setInputText]=useState({ 
        email:"",
        password:""
    });
    
    const[wemail,setwemail]=useState(false);
    const[wpassword,setwpassword]=useState(false);

    const Eye=()=>{
        if(inpass == "password"){
            setinpass("text");
            seteye(false); 
            setwarning(true);
        }
        else{
            setinpass("password");
            seteye(true);  
            setwarning(false);
        }
    }

    const inputEvent=(event)=>{
        const name=event.target.name; 
        const value=event.target.value;
            setInputText((lastValue)=>{ 
                return{
                    ...lastValue,
                    [name]:value
                }
            }); 
    } 
     
    const submitForm=(e)=>{
         
        e.preventDefault();
        setwemail(false);
        setwpassword(false);

        if(inputText.email === ""){
            setwemail(true);
        }

        else if(inputText.password === "")
        setwpassword(true);

        else{
            dispatch(loginAsync(inputText))
            navigate()
      }
    } 
    
return(
<>
<div className="containerLogin">
  <div className="card">
     <div className="form">
        <div className="left-side">
            <img src="https://imgur.com/K230JeW.jpg"/>
        </div>
        <div className="right-side">
                <div className="heading">
                    <h3>Welcome to University</h3>
                </div> 
                <form onSubmit={submitForm}>
                <div className="input-text">
                    <input type="text"  value={inputText.email} onChange={inputEvent} name="email"  />
                    <i className="fa fa-envelope"></i>
                </div>
                <div className="input-text">
                    <input type={inpass}  value={inputText.password} onChange={inputEvent} name="password"  />
                    <i className="fa fa-lock"></i>
                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                </div>
               
                <div className="button">
                    <button type="submit">Login</button>
                </div>
                 </form>
                <div className="register">
                    <p>Didn't have an account? <Link to={`/ForgotPassword`}>Forgot Password</Link></p>
                </div>
           </div>
        </div>
    </div>
</div>

      
</>
);
}
