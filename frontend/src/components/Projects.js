import React from "react";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.name}</td>
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