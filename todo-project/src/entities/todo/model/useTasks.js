import { useState,useRef,useCallback,useEffect,useMemo, useReducer } from 'react'
import tasksAPI from '@/shared/api/tasks'
// import useTasksLocalStorage from './useTasksLocalStorage'

const tasksReducer = (state, action) =>{
    switch(action.type){
        case 'SET_ALL' :{
            return Array.isArray(action.tasks)? action.tasks : state
        }
        case 'ADD' :{
            return [...state, action.task]
        }
        case 'TOGGLE_COMPLETE' :{
            const {id, isDone} = action
            return state.map((task)=>{
                return task.id === id? {...task, isDone} : task
            })
        }
        case 'DELETE' : {
            return state.filter((task)=>task.id !== action.id)
        }
        case 'DELETE_ALL' :{
            return []
        }
        default:{
            return state
        }
    }
}

const useTasks = ()=>{
         // const[tasks,setTasks] = useState([
    //     {id:'task-1', title:'Buy a milk', isDone:false},
    //     {id:'task-2', title:'Buy a car', isDone:true}
    // ])
    // const{
    //     savedTasks,
    //     saveTasks
    // } = useTasksLocalStorage()
    // const[tasks,setTasks] = useState((savedTasks ?? [
    //     {id:'task-1', title:'Buy a milk', isDone:false},
    //     {id:'task-2', title:'Buy a car', isDone:true}
    // ]))
    const[tasks,dispatch] = useReducer(tasksReducer, [])

    const[searchQuery,setSearchQuery] = useState('')
    const[disappearingTaskId, setDisappearingTaskId] = useState(null)
    const[appearingTaskId, setAppearingTaskId] = useState(null)

    const newTaskInputRef = useRef(null)



    const deleteAllTasks = useCallback(() =>{
        const isConfirmed = confirm('Are you sure you want to delete all')

        if(isConfirmed){
            // Promise.all(
            //     tasks.map(({ id })=>{
            //         return  fetch(`http://localhost:3001/tasks/${id}`, {
            //         method:'DELETE',
            //         })
            //     })
            // )
            tasksAPI.deleteAll(tasks).then(()=> dispatch({type: 'DELETE_ALL'}))
        }
    },[tasks])
    
    const deleteTask = useCallback((taskId) =>{
                // fetch(`http://localhost:3001/tasks/${taskId}`, {
                //     method:'DELETE',
                // })
                tasksAPI.delete(taskId)
                    .then(()=>{
                        setDisappearingTaskId(taskId)
                        setTimeout(()=>{
                            dispatch({type: 'DELETE', id: taskId})
                            setDisappearingTaskId(null)
                        }, 400)
                    })

    },[])

    const toggleTaskComplete = useCallback((taskId, isDone) =>{
        
        // fetch(`http://localhost:3001/tasks/${taskId}`, {
        //     method:'PATCH',
        //     headers:{
        //         'Content-Type': 'application/json',
        //     }, 
        //     body: JSON.stringify({isDone})
        // })
        tasksAPI.toggleComplete(taskId,isDone)
        .then(()=>{
            dispatch({type: 'TOGGLE_COMPLETE', id:taskId, isDone})
        })

    },[])

    const addTask = useCallback((title, callbackAfterAdding)=>{
            const newTask = {
                // id:crypto?.randomUUID() ?? Date.now().toString(),
                title,
                isDone: false,
            }

        // fetch('http://localhost:3001/tasks', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body:JSON.stringify(newTask),
        // })
        // .then((response)=> response.json())
        tasksAPI.add(newTask)
            .then((addedTask)=>{
 // setTasks([...tasks,newTask])
            dispatch({type: 'ADD', task: addedTask})
            callbackAfterAdding()
            setSearchQuery('')
            newTaskInputRef.current.focus()
            setAppearingTaskId(addedTask.id)
            setTimeout(() => {
                setAppearingTaskId(null)
            }, 400)
        })
    },[])
    // const addTask = () =>{
        // if(newTaskTitle.trim().length>0){
        //     const newTask = {
        //         id:crypto?.randomUUID() ?? Date.now().toString(),
        //         title:newTaskTitle,
        //         isDone:false
        //     }
        //     setTasks([...tasks,newTask])
        //     setNewTaskTitle('')
        //     setSearchQuery('')
        // }
    // }

    // useEffect(()=>{
    //     const savedTasks = localStorage.getItem('tasks')
    //     if(savedTasks){
    //         setTasks(JSON.parse(savedTasks))
    //     }
    // }, [])
    // useEffect(()=>{
    //     saveTasks(tasks)

    // },[tasks])

    useEffect(()=>{
        newTaskInputRef.current.focus()
        // серерна логіка
        // fetch('http://localhost:3001/tasks')
        // .then((response) => response.json())
        tasksAPI.getAll()
        .then((serverTasks)=>{
            dispatch({type: 'SET_ALL', tasks: serverTasks})
        })
    }, [])

    const filteredTasks = useMemo(()=> {
        const cleanSearchQuery = searchQuery.trim().toLowerCase()

        return cleanSearchQuery.length>0
        ? tasks.filter(({title})=> title.toLowerCase().includes(cleanSearchQuery))
        : null
    },[searchQuery, tasks])

    return{
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
    }
}

export default useTasks
