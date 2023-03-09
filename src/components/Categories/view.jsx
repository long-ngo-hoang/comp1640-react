import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {getCategories} from '../../redux/categoriesSlice'
import {selectAllCategories} from '../../redux/categoriesSlice'
import {deleteCategoryAsync} from '../../redux/categoriesSlice'



const ViewCategories = () => {
  const category = useSelector(selectAllCategories)
 
  const dispatch = useDispatch()

  function handleRemove(id) {
    dispatch(deleteCategoryAsync(id));
  }

  
  useEffect(() => {
    dispatch(getCategories())     
  }, [])

  return (
    <div>
        <h2>Categories list</h2>
          <Link to={`/category/createCatogory`}>
            <button>
            Create Idea
            </button>
            </Link>
        <ul>
          {category.map(category => (
            <li key={category.id}>{category.name}
            <button type="button" onClick={() => handleRemove(category.id)}>
            Remove
          </button>
          <Link to={`/category/edit/${category.id}`}>
            <button>
            Update Category
            </button>
            </Link>
          </li>    
          ))}
        </ul>
    </div>
  )
}
export default ViewCategories;