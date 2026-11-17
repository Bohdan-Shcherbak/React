/* eslint-disable react-refresh/only-export-components */

import {createContext} from 'react'
import useTasks from '../hooks/useTasks'
import useInCompleteTaskScroll from '../hooks/useInCompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {children} = props

    const {
        tasks,
        filteredTasks,

        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId
    } = useTasks()

    const{
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    } = useInCompleteTaskScroll(tasks)
    
    return (
        <TasksContext.Provider
        value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskId,
                deleteTask,
                deleteAllTasks,
                toggleTaskComplete,

                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask,
                disappearingTaskId,
                appearingTaskId
        }}
        >
        {children}
        </TasksContext.Provider>
    )
}