import { useContext,} from 'react'

import {TodoItem, TasksContext} from "@/entities/todo"

const TodoList = (props)=>{
  const {styles} = props

 const{
        tasks,
        filteredTasks
    } = useContext(TasksContext)


    const hasTaksks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if(!hasTaksks){
        return <div className={styles.emptyMessage}>There are no tasks yet</div>
    }

    if(hasTaksks && isEmptyFilteredTasks){
      return <div className={styles.emptyMessage}>Task not found</div>
    }

    return (
        <ul className={styles.list}>
          {/* <TodoItem 
            className='todo__item'
            id='task-1'
            title='Buy milk'
            isDone={false}
          />    

          <TodoItem 
            className='todo__item'
            id='task-2'
            title='Buy a car'
            isDone
          />     */}
          {(filteredTasks ?? tasks).map((task)=>(
            <TodoItem
              className={styles.item}
              id={task.id}
              title={task.title}
              isDone={task.isDone}
              key={task.id}
              {...task}
            />
            // або {...task} розгалужить параметри як аргументи 
          ))}
        </ul>
    )

}

export default TodoList