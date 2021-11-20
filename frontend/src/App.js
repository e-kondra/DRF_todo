import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import React from 'react';
import UserList from "./components/users";
import users from "./components/users";
import axios from "axios";
import Menu from "./components/Menu";

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
            <body >
            <div className="d-flex flex-column min-vh-100">
                <div className="wrapper flex-grow-1">
                    <div className="menu-main">
                        <Menu/>
                    </div>
                    <UserList users={this.state.users}/>
                </div>
                <footer className="footer"> FOOTER</footer>
            </div>
            </body>
        );
    };

}

export default App;
