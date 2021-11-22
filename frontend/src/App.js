import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import UserList from "./components/users";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {Button} from "react-bootstrap";

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

    }

    render() {
        return (
            <div>
                <Menu/>
                <UserList users={this.state.users}/>
                <Footer/>
            </div>
        );
    };

}

export default App;
