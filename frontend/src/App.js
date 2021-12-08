import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {HashRouter, BrowserRouter, Route, Switch, Link} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie/lib";
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
            'token': '',
            'username': '',
        }
    }
    setToken(token){
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
        console.log(this.state)
    }

    isAuth(){
        return !!this.state.token
    }

    getTokenFromStorage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    logout(){
        this.setToken('')
        this.setUsername('')
    }


    setUsername(username){
        const cookies = new Cookies()
        cookies.set('username', username)
        this.setState({'username': username})
        console.log(this.state)
    }
    getUsername(){
        return this.state.username
    }

    getToken(username, password) {  //получаем токен из backend
        const data = {username: username, password: password}
        this.setUsername(username)
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(
            response => {
                this.setToken(response.data['token'])
                console.log(response.data)
                // cookies.set('token', response.data)
            }
        ).catch(error => alert('Не верный логин или пароль'))

    }

    getHeaders(){
        let headers ={
            'Content-Type': 'application/json'
        }
        if (this.isAuth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    loadData(){
        const headers = this.getHeaders()
        console.log(headers)
        axios.get('http://127.0.0.1:8000/api/users',{headers}).then(
            response => {
                const users = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({users: []})
        }) // перенаправляем ошибку в консоль

        axios.get('http://127.0.0.1:8000/api/projects',{headers}).then(
            response => {
                const projects = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        }) // перенаправляем ошибку в консоль

        axios.get('http://127.0.0.1:8000/api/todo',{headers}).then(
            response => {
                const todos = response.data.results // тут лежит список данных
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        }) // перенаправляем ошибку в консоль
    }

    componentDidMount() { // componentDidMount отрабатывает при монтировании компонентов
        this.getTokenFromStorage() //получили токен

        //this.loadData() // отправляем запросы
        // this.loginLogout()
    }


    render() {
        console.log(this.state.username)
        return (
            <div>
                <HashRouter>
                    {/* вот тут в меню передаю username, а в Menu.js он не приходит */}
                    <Menu component={() => <Menu username={this.state.username}/>}/>
                    {this.isAuth() ? <button onClick={() => this.logout()}> Logout </button> : <Link to='/login'>Login</Link>}
                    {this.state.username}
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
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
