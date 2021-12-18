import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {

    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.urlRep}</td>
            <td>{project.users}</td>
            <td>
                <button onClick={()=> deleteProject(project.id)} type="button"> Delete </button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (

        <table className="my_table">
            <th>NAME</th>
            <th>URL</th>
            <th>USERS</th>
            <th>
            </th>
            {projects.map((project) => < ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList;