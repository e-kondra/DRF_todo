import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter, BrowserRouter, Route, Switch} from "react-router-dom";
import axios from "axios";

import UserList from "./components/users";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Projects";
import TodoList from "./components/TodoLs";
import NotFound404 from "./components/NotFound404";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() { // componentDidMount отрабатывает при монтировании компонентов
        axios.get('http://127.0.0.1:8000/api/users').then(
            response => {
                const users = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error)) // перенаправляем ошибку в консоль

        axios.get('http://127.0.0.1:8000/api/projects').then(
            response => {
                const projects = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => console.log(error)) // перенаправляем ошибку в консоль

        axios.get('http://127.0.0.1:8000/api/todo').then(
            response => {
                const todos = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => console.log(error)) // перенаправляем ошибку в консоль

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                    <Footer/>
                </BrowserRouter>

            </div>
        );
    };

}

export default App;
