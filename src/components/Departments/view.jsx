import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getDepartments} from '../../redux/departmentsSlice'
import {selectAllDepartments} from '../../redux/departmentsSlice'
import {deleteDepartmentsAsync} from '../../redux/departmentsSlice'



const ViewDepartments = () => {
  const department = useSelector(selectAllDepartments)
  const dispatch = useDispatch()

  function handleRemove(id) {
    dispatch(deleteDepartmentsAsync(id));
  }

  
  useEffect(() => {
    dispatch(getDepartments())     
  }, [])

  return (
    <div>
        <h2>Department list</h2>
          <Link to={`/departments/create`}>
            <button>
            Create Idea
            </button>
            </Link>
        <ul>
          {department.map(item => (
            <li key={item.id}>{item.name}
            <button type="button" onClick={() => handleRemove(item.id)}>
            Remove
          </button>
          <Link to={`/departments/edit/${item.id}`}>
            <button>
            Update Departments
            </button>
            </Link>
          </li>    
          ))}
        </ul>
    </div>
  )
}
export default ViewDepartments;