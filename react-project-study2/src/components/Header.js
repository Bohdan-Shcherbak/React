import React from 'react';

// компонент не можна змінювати через props, лише виводити
class Header extends React.Component {
  // функція
  render(){
    return (
      <header className="header">
        {this.props.title}
      </header>
    )
  }
}
export default Header