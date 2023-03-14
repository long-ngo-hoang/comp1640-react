import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteCommentAsync } from '../../redux/commentsSlice'
import { getIdeaByID } from '../../redux/ideasSlice'
import {selectAllIdeas} from '../../redux/ideasSlice'
import './detail.css'

export default function DetailIdea() {

    const { postId } = useParams()
    const idea = useSelector(selectAllIdeas)
    const [showCommet, setShowComment] = useState(true)
    const dispatch = useDispatch()

    const onClickShowComment = () => setShowComment(!showCommet)

    function handleRemove(id) {
         dispatch(deleteCommentAsync(id));
    }

    useEffect(() => {
        dispatch(getIdeaByID(postId))     
      }, [])
    // const renderListComment = idea.comments?.map((item) =>
    //  <li key={item.id}>{item.content}</li> );

    if (!idea) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article className='container detail__content'>
            <div className='title'>
            {/* {idea?.map(item =>
                 (                                                           
                <li>{item.name}</li>               
              ))}     */}
            <h2>{idea.name}</h2>
            <p>{idea.id}</p>
            </div>
            <div className='icon'>
            <i className="fas fa-thumbs-up"></i>
            <i className="fas fa-comment" onClick={onClickShowComment}></i>
            </div>   
            {/* {showCommet && <h2> erpr</h2><div> 
             */}
             {/* {idea.comments.length ? idea.comments : <h2> error</h2> }  */}
            {showCommet && <div> 
                
            <ul className='item'>
            {idea.comments?.map(item=> (
                <li key={item.id}>{item.content}
                <button type="button" className='btn btn-danger btn-remove' onClick={() => handleRemove(item.id)}>Remove</button>
                {/* <button><Link to={`/idea/comment/edit/${item.id}`}>Edit Post</Link></button> */}
                <Link to={`/idea/comment/edit/${item.id}`}><button className='btn btn-info btn-edit'>Edit Post</button></Link>
                    </li>
                ))}
                {/* <AddComments/> */}
                {/* {renderListComment} */}
            </ul>
            </div>}
            <p className="postCredit">      
            </p>
        </article>
    )
}


