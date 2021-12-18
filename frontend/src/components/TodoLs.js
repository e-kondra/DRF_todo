import React from "react";


const TodoItem = ({todo, deleteTodo}) => {
    console.log(deleteTodo)
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.creator}</td>
            {todo.isActive ? <td>Yes</td> : <td>No</td> }
            <td>
                <button onClick={()=>deleteTodo(todo.id)} type='button'> Delete </button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    console.log(deleteTodo)
    return (

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
    )
}

export default TodoList;