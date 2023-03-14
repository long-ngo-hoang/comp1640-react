import NewsPage from './components/pages/newpage/newspage';
import NavBar from './components/navbar';
import ManageIdeas from './components/pages/manage/manageideas';
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
import {LogIn} from './components/Login/login';
import HomePage from './components/pages/homepage';
import RequireAuth from './authorization';
import ViewAcademicYears from './components/AcademicYears/view';
import AddAcademicYears from './components/AcademicYears/create';
import './App.css';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>     
     <NavBar  />
      <Routes>
      <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/news' element={<NewsPage />} />

        
        <Route path="idea" element={<RequireAuth allowedRoles={["Administrator"]}/>}>    
          <Route path="view" element={<IdeasView />} />
          <Route path="create" element={<AddIdea />} />
          <Route path="detail/:postId" element={<DetailIdea />} />
          <Route path="edit/:postId" element={<UpdateIdea />} />
          <Route path="comment/edit/:Id" element={<EditComments />} />
        </Route>

        <Route path="category">
          <Route path="view" element={<ViewCategories />} />
          <Route path="createCatogory" element={<AddCategories/>} />
          <Route path="edit/:Id" element={<UpdateCategories />} />
        </Route>

        <Route path="departments">
          <Route path="view" element={<ViewDepartments />} />
          <Route path="create" element={<AddDepartments/>} />
          <Route path="edit/:Id" element={<UpdateDepartments />} />
        </Route>
        <Route path="academicyear">
          <Route path="view" element={<ViewAcademicYears />} />
          <Route path="create" element={<AddAcademicYears/>} />
          <Route path="edit/:Id" element={<UpdateDepartments />} />
        </Route>

        <Route path="profile">
          <Route path="view" element={<UserView />} />
          {/* <Route path="create" element={<AddDepartments/>} /> */}
          <Route path="edit/:Id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
