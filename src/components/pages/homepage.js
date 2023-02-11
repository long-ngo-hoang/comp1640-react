import GetData  from "../../APIs/getdata"
import TodoList from "../../APIs/deleteIdea"


export default function HomePage(){
    return(
        <>
        <h1>Home Page</h1>
        <GetData />
        <TodoList/>
        
        </>
    )
}