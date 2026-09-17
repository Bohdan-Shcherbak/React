import React from 'react';
import Header from './components/Header'
import Image from './components/Image'
import photo from './img/1.png'
// Всередині цього файлу збираємо всі компоненти

// функція і є компонент і її назва
// const App = (params) => {
//   return (
//     <div className="name">
//       <Header />
//       <Header />
//         <h1>{helpText}</h1>
//       <input placeholder= {helpText}
//             onClick={inputClick} 
//             onMouseEnter={mouseOver} />
//             <p>{1+5}</p>
//             <p>{helpText === 'Help text'? 'Yes' : 'No'}</p>
//     </div>)
// }

// або через клас компонент
class App extends React.Component {
    // аргумент повинен бути
    constructor(props){
        // за замовчуванням
        super(props)
        // стан який змінює
        this.state = {
            helpText:"Help text",
            userData:"",
        }
        // Треба звернутись до метода який створений нижче
        this.inputClick = this.inputClick.bind(this)
    }
// componentDidUpdate - теж саме що UseState тільки для классів
    componentDidUpdate(prevProp){
        if(this.state.helpText !== "help")
            console.log("Some");
            
    }
    //Просто змінна   
    // helpText = 'Help text'
    render(){
        return (
        <div className="name">
            {/* компонент не можна змінювати через props, лише виводити */}
            <Header title="Шапка сайту" />
            <Header title="Шапка сайту!!!"/>
            {/* для просто змінної */}
            {/* <h1>{this.helpText}</h1> */}
            <h1>{this.state.helpText}</h1>
            <h2>{this.state.userData}</h2>

            <input placeholder= {this.state.helpText}
                onChange={event => this.setState({userData:event.target.value})}
                onClick={this.inputClick} 
                onMouseEnter={this.mouseOver} />
            <p>{1+5}</p>
            <p>{this.state.helpText === 'Help text'? 'Yes' : 'No'}</p>

            <Image image={photo} alt="1"/>
            <img src={photo} alt="2"/>
            
        </div>)
    }
//   inputClick(){this.helpText = 'Changed'} - Заичайний клік зі зміною змінної
  inputClick()
  {
    // setState - для того щоб змінити стан. Аргумент це об'єкт
    this.setState({helpText:"Changed"})
    console.log('clicked')}
  mouseOver()
  {console.log('mouseover')}
}


// Без компонента
// const elements = (
// <div className="name">
//     <h1>{helpText}</h1>
//   <input placeholder= {helpText}
//         onClick={inputClick} 
//         onMouseEnter={mouseOver} />
//         <p>{1+5}</p>
//         <p>{helpText === 'Help text'? 'Yes' : 'No'}</p>
// </div>)

export default App