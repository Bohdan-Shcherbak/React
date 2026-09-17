import React from 'react';

class Image extends React.Component {
  // функція
  render(){
    return (
      <img  src={this.props.image}/>
    )
  }
}
export default Image