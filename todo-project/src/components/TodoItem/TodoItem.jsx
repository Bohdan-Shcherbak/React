import {memo, useContext} from 'react'
import { TasksContext } from '../../context/tasksContext'
import RouterLink from '../RouterLink/RouterLink'

import styles from './TodoItem.module.scss'
// import useCombinedRefs from '../../hooks/useCombinedRefs'

const TodoItem = (props)=>{
    const{
        className = '',
        id,
        title,
        isDone,
    } = props

    const{
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        toggleTaskComplete,
        disappearingTaskId,
        appearingTaskId
    } = useContext(TasksContext)

    // const animationRef = useRef(null)
    // const combinedRef = useCombinedRefs(
    //     id === firstIncompleteTaskId ? firstIncompleteTaskRef : null,
    //     animationRef
    // )

    // const handleClick = () => {
    //     animationRef.current?.classList.add(styles.isDisappearing)
    //     setTimeout(()=>{
    //         deleteTask(id)
    //     }, 400)
    // }
    return (
        <li 
            className={`
                ${styles.todoItem} 
                ${className} 
                ${disappearingTaskId === id ? styles.isDisappearing : ''} 
                ${appearingTaskId === id ? styles.isAppearing : ''}
                `} 
            ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}>
            
            <input
                className={styles.checkbox}
                id={id}
                type="checkbox"
                checked = {isDone}
                // onchange={({target})=>onTaskCompleteChange(id, target.checked)}
                onChange={(event)=>toggleTaskComplete(id, event.target.checked)}
                
            />
            <label
                className={`${styles.label} visually-hidden`}
                htmlFor={id}
            >
            {title}
            </label>

            {/* <a href={`/tasks/${id}`} aria-label='Task detail page'>
                {title}
            </a> */}
            <RouterLink to={`/tasks/${id}`} aria-label='Task detail page'>
                {title}
            </RouterLink>

            <button
                className={styles.deleteButton}
                aria-label="Delete"
                title="Delete"
                onClick={()=>{deleteTask(id)}}
            >
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 5L5 15M5 5L15 15"
                    stroke="#757575"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    </li>
    )
}

export default memo(TodoItem)