import React from "react";
import {Navbar, Nav, Table} from "react-bootstrap";
import {HashRouter, Link, useParams} from "react-router-dom";
import * as path from "path";


const TodoItem = ({todo}) => {

    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.creator}</td>
            <td>{todo.isActive}</td>
        </tr>
    )
}

const UserItem = ({user, proj}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const ProjectsTodoList = ({todos, projects, users}) => {
    let {id} = useParams();
    let filtered_items = todos.filter(todo => todo.project == (parseInt(id)))
    let proj = projects.filter(project => project.id == (parseInt(id)))[0]
    console.log(proj)

    return (
        <div>
            <h3>{proj.name}</h3>
            <div>URL: {proj.urlRep}</div>

            <div>Todo_List of {proj.name}: </div>
            {/*<div> /div>*/}
            <Table className="bordered small">
                <th>text</th>
                <th>date_create</th>
                <th>date_update</th>
                <th>creator</th>
                <th>is_active</th>
                {filtered_items.map((todo) => <TodoItem todo={todo}/>)}
            </Table>
        </div>
    )
}

export default ProjectsTodoList;