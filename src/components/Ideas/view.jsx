   import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
  import { fetchIdeas } from '../../redux/ideasSlice'
  import { deleteIdeaAsync } from '../../redux/ideasSlice'
  import {selectAllIdeas} from '../../redux/ideasSlice'
  import {  useNavigate  } from 'react-router-dom'
  import { Link } from 'react-router-dom'
  import  './view.css'
  import { logout } from '../../redux/loginSlice'

  const IdeasView = () => {
    const ideas = useSelector(selectAllIdeas)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    function handleRemove(id) {
      dispatch(deleteIdeaAsync(id));
    }

    function handleLogout() {
      dispatch(logout());
    }

    useEffect(() => {
      dispatch(fetchIdeas())     
    }, [])

    return (
      <div class="idea__content container">
        <h2>List ideas</h2>
        <div>
        <ul>
           {ideas === null 
            ? <h1> page not have data</h1> :
              ideas?.map(item =>
                 (                  
                <div className='item row'                                 
                key={item.id}>{item.name} 
                <button className='col-4' type="btn-btn" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
              {/* <button type="button" onClick={() => navigate(`idea/${item.id}`)}>test View</button>  */}
              <Link to={`/idea/detail/${item.id}`}><button>View Idea</button></Link>
              <button className='col-4'><Link to={`/idea/edit/${item.id}`}>Edit Post</Link></button>
              <button className='col-4'><Link to={`/idea/edit/${item.id}`}>Edit Post</Link></button>
              {/* <Link to={`/idea/edit/${item.id}`}>Edit Post</Link> */}
              
              </div>    
              ))}                
          </ul>
          <button className='col-4' type="btn-btn" onClick={() => handleLogout()}>
                logout
              </button>
        </div>
          
      </div>
    )
  }
export default IdeasView;