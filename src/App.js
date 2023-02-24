import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/homepage';
import NewsPage from './components/pages/newpage/newspage';
import NavBar from './components/navbar';
import ManageIdeas from './components/pages/manage/manageideas';
import DetailIdea from './components/CreateIdea/detailIdea';
import UpdateIdea from './components/CreateIdea/updateIdea';

function App() {
  return (
    <>     
     <NavBar  />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/news' element={<NewsPage />} /> */}
        {/* <Route path='/login' element={<LogIn />} /> */}
        <Route path="idea">
          <Route path=":postId" element={<DetailIdea />} />
          <Route path="edit/:postId" element={<UpdateIdea />} />
        </Route>
      </Routes>


    </>
  );
}

export default App;
