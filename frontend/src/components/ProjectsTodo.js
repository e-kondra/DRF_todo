import React from "react";
import {Form, Navbar, Nav, Table, Alert} from "react-bootstrap";
import {HashRouter, Link, useParams} from "react-router-dom";
import * as path from "path";


const TodoItem = ({todo}) => {

    return (
        <tr>
            <td>{todo.text}</td>
            <td>{todo.dateCreate}</td>
            <td>{todo.dateUpdate}</td>
            <td>{todo.creator}</td>
            {todo.isActive ? <td>Yes</td> : <td>No</td>}
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
    let filtered_items = todos.filter(todo => todo.project === (parseInt(id)))
    let proj = projects.filter(project => project.id === (parseInt(id)))[0]
    console.log(proj)

    return (
        <Form>
            <div>
                <Alert variant="success">
                    <Alert.Heading>{proj.name}</Alert.Heading>
                    <p>URL: {proj.urlRep}</p>
                </Alert>

                <p>Todo_List of {proj.name}:</p>
                <Table striped bordered hover size="sm">
                    <thead>
                        <th>text</th>
                        <th>date_create</th>
                        <th>date_update</th>
                        <th>creator</th>
                        <th>is_active</th>
                    </thead>
                    <tbody>
                        {filtered_items.map((todo) => <TodoItem todo={todo}/>)}
                    </tbody>
                </Table>
            </div>
        </Form>
    )
}

export default ProjectsTodoList;