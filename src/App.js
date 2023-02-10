import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/homepage';
import NewsPage from './components/pages/newspage';
import axios from 'axios';
// import React from 'react';


 function GetData(){
  // const [data,setdata] =React.useState('');

  axios.get(`https://localhost:44393/weatherforecast`)
  .then((res) =>  {
      console.log(res);
      // setdata(res.data.data)
  })
  return (
      // <div> abbc</div>
      <p>abc</p>
  )
}

function App() {
  return (
    <div className="App">
      <button onClick={GetData}>oke</button>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/news' element={<NewsPage />} />

      </Routes>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
