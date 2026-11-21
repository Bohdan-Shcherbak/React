/* eslint-disable react-refresh/only-export-components */

import {createContext, useMemo} from 'react'
import useTasks from './useTasks'
import useInCompleteTaskScroll from './useInCompleteTaskScroll'

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const {children} = props

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
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
    
    const value = useMemo(()=>({
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
    }), [
            tasks,
            filteredTasks,
            deleteTask,
            deleteAllTasks,
            toggleTaskComplete,
            searchQuery,
            setSearchQuery,
            newTaskInputRef,
            addTask,
            disappearingTaskId,
            appearingTaskId,
            firstIncompleteTaskRef,
    ])

    return (
        <TasksContext.Provider
        value={value}>
        {children}
        </TasksContext.Provider>
    )
}