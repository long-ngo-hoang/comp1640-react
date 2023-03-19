import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/usersSlice.js';
import { useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/usersSlice.js'

export default function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(selectAllUsers)

    const [users, setUsers] = useState({
        email: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    });
  
    const onChangeMail = (e) =>{
        setUsers((preV) => {     
            return{...preV, email: e.target.value}
        })
    }

    const onChangePassword = (e) =>{
        setUsers((preV) => {     
            return{...preV, password: e.target.value}
        })
    }

    const onChangeNewPassword = (e) =>{
        setUsers((preV) => {
            return{...preV, newPassword: e.target.value}
        })
    }

    const onChangeConfirmPassword = (e) =>{
        setUsers((preV) => {
            return{...preV, confirmPassword: e.target.value}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(changePassword(users)
        ) 
        navigate(`/profile/view`)
    }

        return (
          <>
            <form>
            <h1>Change Pass</h1>
                <label htmlFor="email">Emai</label>
                <input onChange={onChangeMail} value={users.email}/>
                <label htmlFor="pass">Password</label>
                <input onChange={onChangePassword} value={users.password}/>
                <label htmlFor="newPass">New password</label>
                <input onChange={onChangeNewPassword} value={users.newPassword}/>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input onChange={onChangeConfirmPassword} value={users.confirmPassword}/>
                <button onClick={handleSubmit}>Update Password</button>
            </form>
          </>
        )
}