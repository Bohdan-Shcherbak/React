import { TasksProvider } from "../context/tasksContext"

import Todo from '../components/Todo/Todo'
const TasksPage = () =>{
    return(
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default TasksPage