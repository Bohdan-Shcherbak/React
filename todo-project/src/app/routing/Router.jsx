import { useEffect, useState } from "react"
import { BASE_URL } from "../../shared/constants"

const getCurrentPath = ()=>{
    const pathname = window.location.pathname
    
    return pathname.startsWith(BASE_URL)
    ? pathname.slice(BASE_URL.length-1) || '/'
    : pathname
}
const mathPath = (path, route) =>{
    const pathParts = path.split('/')
    const routePaths = route.split('/')
    if(pathParts.length !== routePaths.length){
        return null
    }

    const params = {}
        for (let i = 0; i < routePaths.length; i++) {
            const element = routePaths[i];
            if(element.startsWith(':')){
                const paramName = element.slice(1)

                params[paramName] = pathParts[i]
            } else if (element !== pathParts[i]){
                return null
            }
        }
    return params
}

export const useRoute = () =>{
    const [path,setPath] = useState(getCurrentPath)

    useEffect(()=>{
        const onLocationChange = () => {
            setPath(getCurrentPath)
        }

        window.addEventListener('popstate', onLocationChange)

        return ()=>{
            window.removeEventListener('popstate',onLocationChange)
        }
    }, [])

    return path
}

const Router = (props) => {
    const {routes} = props
    const path = useRoute()
    // if(path.startsWith('/tasks/')){
    //     const id = path.replace('/tasks/', '')
    //     const TaskPage = routes['/tasks/:id']

    //     return <TaskPage params={{id}} />
    // }
    // const Page = routes[path] ?? routes['*']
    // return <Page/>

    for (const route in routes) {
        const params = mathPath( path, route)

        if(params){
            const Page = routes[route]

            return <Page params={params} />
        }
    }

    const NotFound = routes['*']

    return <NotFound />
}

export default Router