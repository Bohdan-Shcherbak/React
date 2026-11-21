const RouterLink = (props) =>{
    const{
        to,
        children,
        ...rest
    } = props

    const handleClick = (event) =>{
        event.preventDefault()
        // змінити адресу без перезавантаження
        window.history.pushState({}, '', to)
        // вручну генеруємо popstate , щоб роутер зрозумів що змінився і оновив стан
        window.dispatchEvent(new PopStateEvent('popstate'))
    }
    return (
        <a href={to} onClick={handleClick} {...rest}>
            {children}
        </a>
    )
}

export default RouterLink