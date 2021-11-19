import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/users";
import users from "./components/users";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() { // componentDidMount отрабатывает при монтировании компонентов
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data // тут лежит список данных
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error)) // перенаправляем ошибку в консоль
        // const users = [
        //     {
        //         'username':'sobaka',
        //         'first_name':'Моня',
        //         'last_name':'Горшкова',
        //         'email':'monya@mail.ru',
        //     },
        //     {
        //         'username':'koshka',
        //         'first_name':'Ириска',
        //         'last_name':'Горшкова',
        //         'email':'iriska@mail.ru',
        //     },
        // ]
        // this.setState(
        //     {
        //         'users': users
        //     }
        // )
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        );
    }

}

export default App;
