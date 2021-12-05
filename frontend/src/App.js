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
import ProjectsTodoList from "./components/ProjectsTodo";
import LoginForm from "./components/LoginForm";


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
                <HashRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' component={() => <LoginForm/>}/>
                        <Route path='/project/:id'>
                            <ProjectsTodoList todos={this.state.todos} projects={this.state.projects}/>
                        </Route>
                        <Route component={NotFound404}/>
                    </Switch>
                    <Footer/>
                </HashRouter>

            </div>
        );
    };

}

export default App;
