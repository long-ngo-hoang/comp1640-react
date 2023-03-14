import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getAcademicYears} from '../../redux/academicYearsSlice'
import {selectAllAcademicYears} from '../../redux/academicYearsSlice'
import {deleteAcademicYearsAsync} from '../../redux/academicYearsSlice'

const ViewAcademicYears = () => {
  const academicView = useSelector(selectAllAcademicYears)
  
  const dispatch = useDispatch()

  function handleRemove(id) {
    dispatch(deleteAcademicYearsAsync(id));
  }

  useEffect(() => {
    dispatch(getAcademicYears())     
  }, [])

  return (
    <div>
        <h2>academicyear list</h2>
          <Link to={`/academicyear/create`}>
            <button>
            Create Idea
            </button>
            </Link>
        <ul>
          {academicView?.map(item => (
            <li key={item.id}>{item.name}
                <button type="button" onClick={() => handleRemove(item.id)}>
            Remove
          </button>
          </li>    
          ))}
        </ul>
    </div>
  )
}

export default ViewAcademicYears;