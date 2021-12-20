import React from "react";
import * as moment from "moment";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


const TodoItem = ({todo, users, deleteTodo}) => {
    let creator = users.filter(user => user.id === todo.creator)[0]
    // console.log(creator)
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{moment(todo.dateCreate).format('MM-DD-YYYY hh:mm')}</td>
            <td>{moment(todo.dateUpdate).format('MM-DD-YYYY hh:mm')}</td>
            <td>{creator.username}</td>
            {todo.isActive ? <td>Yes</td> : <td>No</td>}
            <td>
                <Button onClick={() => deleteTodo(todo.id)} variant="secondary"> Delete</Button>
            </td>

        </tr>
    )
}

const TodoList = ({todos, users, deleteTodo}) => {
    console.log(deleteTodo)
    return (
        <div>
            <table className="my_table">
                <th>project</th>
                <th>text</th>
                <th>date_create</th>
                <th>date_update</th>
                <th>creator</th>
                <th>is_active</th>
                <th>
                </th>
                <th>
                </th>
                {todos.map((todo) => < TodoItem todo={todo} users={users} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='todo/create'> Create </Link>
        </div>
    )
}

export default TodoList;