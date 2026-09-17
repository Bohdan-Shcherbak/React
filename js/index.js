// ReactDOM.render(
//     <div>
//         <h1>Hello</h1>
//     </div>,
//     document.getElementById("app"))

    // JSX - Java Script XML
    // без JSX
    // ReactDOM.render(React.createElement('input', {
    //     placeholder:'Help text',
    //     onClick:()=>console.log('clicked'),
    //     onMouseEnter:()=>console.log('mouseover'),
    // }),document.getElementById("app"))
const inputClick = () =>{console.log('clicked')}
const mouseOver = () =>{console.log('mouseover')}

const helpText = 'Help text'

const elements = (<div className="name">
    <h1>{helpText}</h1>
<input placeholder= {helpText}
        onClick={inputClick} 
        onMouseEnter={mouseOver} />
        <p>{1+5}</p>
        <p>{helpText == 'Help text'? 'Yes' : 'No'}</p>
    </div>)

const app = document.getElementById("app")
    ReactDOM.render(elements,app)