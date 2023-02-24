   import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
  import { fetchIdeas } from '../redux/ideasSlice'
  import { deleteIdeaAsync } from '../redux/ideasSlice'
  import {selectAllIdeas} from '../redux/ideasSlice'


  const IdeasView = () => {
    const idea = useSelector(selectAllIdeas)
    const dispatch = useDispatch()
    function handleRemove(id) {
      dispatch(deleteIdeaAsync(id));
    }

    
    // // function handleRemove(id) {
    // //   dispatch(deleteIdeaAsync(id));
    // // }
    
    useEffect(() => {
      dispatch(fetchIdeas())     
    }, [])

    return (
      <div>
        <h2>List of Users</h2>
          <ul>
            {idea.map(idea => (
              <li key={idea.id}>{idea.name}
              <button type="button" onClick={() => handleRemove(idea.id)}>
              Remove
            </button>

            <Link to={`Idea/${idea.id}`}>View Idea</Link>
            <Link to={`/Idea/edit/${idea.id}`}>Edit Post</Link>
            </li>    
            ))}
          </ul>
      </div>
    )
  }
export default IdeasView;