import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/homepage';
import NewsPage from './components/pages/newpage/newspage';
import NavBar from './components/navbar';




function App() {
  return (
    <>     
     <NavBar  />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/news' element={<NewsPage />} />
        {/* <Route path='/login' element={<LogIn />} /> */}
      </Routes>



    </>
  );
}

export default App;
