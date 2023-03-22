import ViewIdeas from './components/Ideas/view';
import NavBar from './components/navbar';
import ManageIdeas from './components/Ideas/manageideas';
import DetailIdea from './components/Ideas/details';
import UpdateIdea from './components/Ideas/edit';
import ViewCategories from './components/Categories/view';
import AddCategories from './components/Categories/create';
import UpdateCategories from './components/Categories/edit';
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
import UpdateAcademicYear from './components/AcademicYears/edit';
import ViewAcademicYears from './components/AcademicYears/view';
import AddAcademicYears from './components/AcademicYears/create';
import ChangePassword from './components/User/resetPass';
import ForgotPassword from './components/Login/forgotPass';
import ViewNotification from './components/Notifications/view';
import ViewRoles from './components/Role/view';
import DetailsRoles from './components/Role/details';
import AddRoles from './components/Role/addRole';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ViewUser from './components/Departments/userView';
import AddDepartmentToUser from './components/Departments/addDepartment';
function App() {
  return (
    <>     
     <NavBar  />
      <Routes>
      <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LogIn/>} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />

        <Route path="ideas" element={<RequireAuth allowedRoles={["Staff","Administrator"]}/>}>   
          <Route path='myideas' element={<ManageIdeas />} />
          <Route path='myideas/:page' element={<ManageIdeas />} />
          <Route path="view" element={<ViewIdeas />} />
          <Route path="create" element={<AddIdea />} />
          <Route path="detail/:id" element={<DetailIdea />} />
          <Route path="edit/:id" element={<UpdateIdea />} />
          <Route path="comment/edit/:id" element={<EditComments />} />
        </Route>

        <Route path="categories">
          <Route path="view" element={<ViewCategories />} />
          <Route path="create" element={<AddCategories/>} />
          <Route path="edit/:id" element={<UpdateCategories />} />
        </Route>

        <Route path="departments">
          <Route path="view" element={<ViewDepartments />} />
          <Route path="viewUser" element={<ViewUser />} />
          <Route path="create" element={<AddDepartments/>} />
          <Route path="addDepartment/:id" element={<AddDepartmentToUser/>} />
          <Route path="edit/:Id" element={<UpdateDepartments />} />
        </Route>
        <Route path="academicYears" element={<RequireAuth allowedRoles={["Administrator"]} />}>
          <Route path="view" element={<ViewAcademicYears />} />
          <Route path="create" element={<AddAcademicYears/>} />
          <Route path="edit/:id" element={<UpdateAcademicYear />} />
        </Route>

        <Route path="profile">
          <Route path="view" element={<UserView />} />
          {/* <Route path="create" element={<AddDepartments/>} /> */}
          <Route path="edit/:id" element={<UpdateUser />} />
          <Route path="changePass" element={<ChangePassword />} />
        </Route>

        <Route path="notification">
          <Route path="view" element={<ViewNotification />} />
        </Route>

        <Route path="role">
          <Route path="view" element={<ViewRoles />} />
          <Route path="create/:id" element={<AddRoles />} />
          <Route path="detail/:id" element={<DetailsRoles />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
