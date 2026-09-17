import React from 'react';
import Button from './Button';

// компонент не можна змінювати через props, лише виводити
class Header extends React.Component {
  // функція
  render(){
    return (
      <header className="header">
        {this.props.title}
        <Button />
        <Button text="Button" />
      </header>
    )
  }
}
export default Header