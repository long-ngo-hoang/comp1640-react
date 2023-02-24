import { useSelector } from 'react-redux'
import { selectIdeaById } from '../../redux/ideasSlice';

import { useParams } from 'react-router-dom';

    export default function DetailIdea() {
    const { postId } = useParams()
  
    const idea = useSelector((state) => selectIdeaById(state, postId))
    console.log(idea);

    if (!idea) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{idea.name}</h2>
            <p>{idea.id}</p>
            <p className="postCredit">      
            </p>
        </article>
    )
}

