import React, { useState } from 'react';
// import axios from 'axios';

export default function AddIdea() {
    const [idea, setIdea] = useState({
        name: "",
        content: "",
        document: "",
    });
    const onChangeName = (e) =>{
        setIdea((preV) => {
            return{...preV, name: e.target.value}
        })
    }
    const onChangeContent = (e) =>{
        setIdea((preV) => {
            return{...preV, content: e.target.value}
        })
    }
    const onChangeDocument = (e) =>{
        setIdea((preV) => {
            return{...preV, document: e.target.value}
        })
    }
    const handleSubmit = (e) =>{
        console.log(idea);
        alert(JSON.stringify(idea, null, 4))
 
  }
    
        return (
          <>
            <form>
                <input onChange={onChangeName} value={idea.name}/>
                <input onChange={onChangeContent} value={idea.content}/>
                <input onChange={onChangeDocument} value={idea.document}/>
                <button onClick={handleSubmit}>Delete Idea</button>
            </form>
          </>
        )
      
}