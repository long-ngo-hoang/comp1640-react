import GetData  from "../../APIs/getdata"
import TodoList from "../../APIs/deleteIdea"


export default function HomePage(){
    return(
        <>
        <h1>HomePage</h1>
        <GetData />
        <TodoList/>
        
        </>
    )
}