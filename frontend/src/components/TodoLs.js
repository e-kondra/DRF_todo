import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


const TodoItem = ({todo, deleteTodo}) => {
    console.log(deleteTodo)
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.creator}</td>
            {todo.isActive ? <td>Yes</td> : <td>No</td>}
            <td>
                <Button onClick={() => deleteTodo(todo.id)} variant="secondary"> Delete</Button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
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
                {todos.map((todo) => < TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='todo/create'> Create </Link>
        </div>
    )
}

export default TodoList;