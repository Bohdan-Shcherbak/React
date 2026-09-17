import React from 'react';

class AddUser extends React.Component {
    userAdd = {}
    constructor(props){
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            university:'',
            age:1,
            isHappy:false
        }
    }

  render(){
    return (
        <form ref={(el)=> this.myForm = el}>
            <input placeholder="Ім'я" onChange={(e)=>{
                this.setState({firstName: e.target.value})
            }} />
            <input placeholder='Прізвище' onChange={(e)=>{
                this.setState({lastName: e.target.value})
            }} />
            <textarea placeholder='Біографія' onChange={(e)=>{
                this.setState({university: e.target.value})
            }} />
            <input placeholder='Вік' type='number'
            onChange={(e)=>{
                this.setState({age: e.target.value})
            }} />
            <label htmlFor="isHappy">Щасливий? </label>
            <input type='checkbox' id='isHappy ' onChange={(e)=>{
                this.setState({isHappy: e.target.checked})
            }} />
            <button type='button' onClick={()=>{
                this.myForm.reset()
                this.userAdd = {
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    university:this.state.university,
                    age:this.state.age,
                    isHappy:this.state.isHappy
                }
                if(this.props.user)
                    this.userAdd.id = this.props.user.id

                this.props.onAdd(this.userAdd)
            }}>Додати</button>
        </form>
    )
  }
}
export default AddUser