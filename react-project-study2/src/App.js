import React from 'react';
import Header from './components/Header'
import Users from './components/Users'
import AddUser from './components/AddUser'
import axios from 'axios'

const baseUrl = 'https://reqres.in/api'
const baseUrl2 = 'https://dummyjson.com/users'

class App extends React.Component {
    constructor(props){
        super(props)

        axios.get(baseUrl2).then((res)=>{
            this.setState({users: res.data.users});
            
        }).catch(err => console.error(err));

        this.state = {
            users: []
            // users:  [
            //     {
            //         id:1,
            //         firstname: 'Bob',
            //         lastname:'Marley',
            //         bio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure repellendus facilis a ipsum, nostrum culpa repellat cum ullam quae unde tenetur consectetur totam nisi exercitationem dicta quod et! Ipsam, nemo.',
            //         age: 40,
            //         isHappy:true,
            //     },
            //     {
            //         id:2,
            //         firstname: 'John',
            //         lastname:'Doe',
            //         bio: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure repellendus facilis a ipsum, nostrum culpa repellat cum ullam quae unde tenetur consectetur totam nisi exercitationem dicta quod et! Ipsam, nemo.',
            //         age: 22,
            //         isHappy:false,
            //     }
            //     ]
        }
        this.addUser = this.addUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.editUser = this.editUser.bind(this)
    }

    render(){
        return (
        <div>
            <Header title="Список користувачів" />
            <main>
                <Users users={this.state.users} onEdit={this.editUser} onDelete={this.deleteUser} />
            </main>
            <aside>
                <AddUser onAdd={this.addUser} />
            </aside>
        </div>)
    }

    deleteUser(id){
        this.setState({
            users:this.state.users.filter((el)=> el.id !== id)
        })
    }

    editUser(user){
        let allUsers = this.state.users
        allUsers[user.id - 1] = user

        this.setState({
            users: []
        }, ()=>{
            this.setState({users: [...allUsers]})
        })
    }
    addUser(user){
        const id = this.state.users.length + 1
        this.setState({users: [...this.state.users, {id, ...user}]})
    }
}

export default App