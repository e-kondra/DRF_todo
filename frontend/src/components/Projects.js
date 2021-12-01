import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.urlRep}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (

        <table className="my_table">
            <th>NAME</th>
            <th>URL</th>
            <th>USERS</th>
            {projects.map((project) => < ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList;