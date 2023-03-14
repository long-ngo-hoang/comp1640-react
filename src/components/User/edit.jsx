import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfilesById } from '../../redux/usersSlice.js';
import { useParams, useNavigate  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/usersSlice.js'

export default function UpdateUser() {

    const { Id } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(selectAllUsers)

    const [users, setUsers] = useState({
        id: Id,
        avatarUrl: user?.avatarUrl,
        fullName: user?.fullName,
        address: user?.address,
        phone: user?.phone,
    });
  
    const onChangeAvatarUrl = (e) =>{
        setUsers((preV) => {     
            return{...preV, avatarUrl: e.target.value}
        })
    }

    const onChangeFullName = (e) =>{
        setUsers((preV) => {
            return{...preV, fullName: e.target.value}
        })
    }

    const onChangeAddress = (e) =>{
        setUsers((preV) => {
            return{...preV, address: e.target.value}
        })
    }

    const onChangePhone = (e) =>{
        setUsers((preV) => {
            return{...preV, phone: e.target.value}
        })
    }

    const handleSubmit = (event )=> {
        event.preventDefault();
        dispatch(updateProfilesById(users)
        ) 
        navigate(`/profile/view`)
    }

        return (
          <>
            <form>
            <h1>Update User</h1>
                <label htmlFor="name">avatarUrl</label>
                <input onChange={onChangeAvatarUrl} value={user.avatarUrl}/>
                <label htmlFor="name">fullName</label>
                <input onChange={onChangeFullName} value={user.fullName}/>
                <label htmlFor="name">address</label>
                <input onChange={onChangeAddress} value={user.address}/>
                <label htmlFor="name">phone</label>
                <input onChange={onChangePhone} value={user.phone}/>
                <button onClick={handleSubmit}>Update User</button>
            </form>
          </>
        )
}