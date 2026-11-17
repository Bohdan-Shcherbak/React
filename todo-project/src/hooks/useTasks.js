import { useState,useRef,useCallback,useEffect,useMemo } from 'react'
import tasksAPI from '../api/tasksAPI'
// import useTasksLocalStorage from './useTasksLocalStorage'


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
    const[tasks,setTasks] = useState([])

    const[newTaskTitle,setNewTaskTitle] = useState('')
    const[searchQuery,setSearchQuery] = useState('')
    const[disappearingTaskId, setDisappearingTaskId] = useState(null)
    const[appearingTaskId, setAppearingTaskId] = useState(null)

    const newTaskInputRef = useRef(null)



    const deleteAllTasks = useCallback(() =>{
        const isConfirned = confirm('Are you sure you want to delete all')

        if(isConfirned){
            // Promise.all(
            //     tasks.map(({ id })=>{
            //         return  fetch(`http://localhost:3001/tasks/${id}`, {
            //         method:'DELETE',
            //         })
            //     })
            // )
            tasksAPI.deleteAll(tasks).then(()=> setTasks([]))
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
                            setTasks(
                                tasks.filter((task)=> task.id !== taskId)
                            )
                            setDisappearingTaskId(null)
                        }, 400)
                    })

    },[tasks])

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
            setTasks(
                tasks.map((task)=>{
                    if(task.id === taskId){
                        return {...task, isDone}
                    }
                    return task
                })
            )
        })

    },[tasks])

    const addTask = useCallback((title)=>{
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
            setTasks((prevTasks)=> [...prevTasks, addedTask])
            setNewTaskTitle('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
            setAppearingTaskId(addedTask.id)
            setTimeout(() => {
                setAppearingTaskId(null)
            }, 2000);
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
        .then(setTasks)
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

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId
    }
}

export default useTasks
