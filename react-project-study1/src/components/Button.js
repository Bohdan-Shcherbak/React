import React,{ useEffect, useState } from 'react';

// функції зручно використовувати для маленьких компонентів, де треба просто вивід інформації
const Button = ({text = "Кнопка"}) => {
    // click - знічення, setClick - функція, щоб змінбвати значення стану. Починається з set і дя що робить
    const [click, setClick] = useState(0)

    useEffect(()=>{
        document.title = `Ви щось нажали ${click}`
    })
    return (
        <button onClick={()=>setClick(click + 1)}>{text} {click}</button>
    )
}
// яещо не передається нічого при виклику
// Button.defaultProps = {
//     text: "Кнопка"
// }
export default Button