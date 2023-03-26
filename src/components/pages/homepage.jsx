// import GetData  from "../../APIs/getdata"
// import TodoList from "../../APIs/deleteIdea"
// import AddIdea from "../../APIs/addIdea"
import IdeasView from "../Ideas/view"
import { LogIn } from "../Accounts/login"
import ViewCategories from "../Categories/view"
import AddCategories from "../Categories/create"
import AddIdea from "../Ideas/create"
import AddComments from "../Comments/create"
import AddAcademicYears from "../AcademicYears/create"
import ViewAcademicYears from "../AcademicYears/view"
import AddDepartments from "../Departments/create"
import ViewDepartments from "../Departments/view"
import ManageIdeas from "../Ideas/manageideas"
export default function HomePage(){
    return(
        <>
        {/* <h1>HomePage</h1>
        <TodoList/> */}
                <LogIn />
        {/* <AddIdea/> */}
        {/* <GetData/> */}
        {/* <FileUpload/> */}
        {/* <AddIdea /> */}
        {/* <IdeasView/> */}
        {/* <ViewCategories/> */}
        {/* <AddCategories/> */}.
        {/* {<AddComments/>} */}
        {/* {<AddAcademicYears/>} */}
        {/* {<ViewAcademicYears/>} */}
        {/* {<AddDepartments/>} */}
        {/* {<ViewDepartments/>} */}
        {/* <ManageIdeas/> */}
        </>
    )
}