import React, { useState } from 'react';
import axios from 'axios';

export default function TodoList() {
    const [idInput, setIdInput] = useState('');

    const handleSubmit = (e) =>{
        setIdInput(e.target.value);
        
        axios.delete(`https://localhost:44393/WeatherForecast/${idInput}`)
        .then(res=> {
            console.log(res);
        
        })
  }
    

        return (
          <>
            <input value={idInput} onChange={e => setIdInput(e.target.value)}/>
            <button onClick={handleSubmit}>Delete Idea</button>
          </>
        )
      
}