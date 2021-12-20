import React from "react";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const ProjectItem = ({project, deleteProject}) => {

    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.urlRep}</td>
            <td>{project.users}</td>
            <td>
                <Button onClick={() => deleteProject(project.id)}  variant="secondary"> Delete</Button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table className="my_table">
                <th>NAME</th>
                <th>URL</th>
                <th>USERS</th>
                <th>
                </th>
                {projects.map((project) => < ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='projects/create'> Create </Link>
        </div>
    )
}

export default ProjectList;