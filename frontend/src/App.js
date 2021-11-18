import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/users";
import users from "./components/users";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() { // componentDidMount отрабатывает при монтировании компонентов
        const users = [
            {
                'username':'sobaka',
                'first_name':'Моня',
                'last_name':'Горшкова',
                'email':'monya@mail.ru',
            },
            {
                'username':'koshka',
                'first_name':'Ириска',
                'last_name':'Горшкова',
                'email':'iriska@mail.ru',
            },
        ]
        this.setState(
            {
                'users': users
            }
        )
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
