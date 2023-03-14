import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/homepage';
import NewsPage from './components/pages/newpage/newspage';
import NavBar from './components/navbar';
import DetailIdea from './components/Ideas/details';
import UpdateIdea from './components/Ideas/edit';
import ViewCategories from './components/Categories/view';
import AddCategories from './components/Categories/create';
import UpdateCategories from './components/Categories/edit';
import IdeasView from './components/Ideas/view';
import EditComments from './components/Comments/edit';
import ViewDepartments from './components/Departments/view';
import AddDepartments from './components/Departments/create';
import UpdateDepartments from './components/Departments/edit';
import AddIdea from './components/Ideas/create';
import UserView from './components/User/view'
import UpdateUser from './components/User/edit';
import { LogIn } from './components/Login/login';
import RequireAuth from './authorization';
import ViewAcademicYears from './components/AcademicYears/view';
import AddAcademicYears from './components/AcademicYears/create';

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
