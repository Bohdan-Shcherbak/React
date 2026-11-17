// import { TasksProvider } from "./components/context/tasksContext"
// import Todo from "./components/Todo"

import Router from "./Router"
import TasksPage from "./pages/TasksPage"
import TaskPage from "./pages/TaskPage"

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
