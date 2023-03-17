import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProfiles } from '../../redux/usersSlice.js'
import { selectAllUsers } from '../../redux/usersSlice.js'
import { Link } from 'react-router-dom'

const UserView = () => {

    const user = useSelector(selectAllUsers)
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getProfiles())     
    }, [])

  return (
    <div class="idea__content container">
      <h2>List ideas</h2>
      <div>
      <ul>
            <h2>{user.id}</h2>
            <h2>{user.createdAt}</h2>
            <button className='col-4'><Link to={`/profile/edit/${user}`}>Edit User</Link></button>
            <button className='col-4'><Link to={`/profile/changePass`}>Change Pass</Link></button>
        </ul>
      </div>
    </div>
  )
}
export default UserView;