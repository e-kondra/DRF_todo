import React from "react";


const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.creator}</td>
            <td>{todo.isActive}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (

        <table className="my_table">
            <th>project</th>
            <th>text</th>
            <th>date_create</th>
            <th>date_update</th>
            <th>creator</th>
            <th>is_active</th>
            {todos.map((todo) => < TodoItem todo={todo}/>)}
        </table>
    )
}

export default TodoList;