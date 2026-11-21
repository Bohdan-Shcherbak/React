// import { TasksProvider } from "./components/context/tasksContext"
// import Todo from "./components/Todo"

import Router from "./routing/Router"
import TasksPage from "@/pages/TasksPages"
import TaskPage from "@/pages/TaskPage"
import './styles'

const App = () => {
    const routes = {
      '/': TasksPage,
      // '/tasks/123': TaskPage,
      '/tasks/:id':TaskPage,
      '*': ()=> <div>404 Page Not Found</div>
    }
  return (
    // <TasksProvider>
    //   <Todo/>
    // </TasksProvider>

  <Router routes={routes} />
  )
}

export default App
