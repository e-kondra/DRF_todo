import React from "react";
import App from "../App";


const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (

        <table className="my_table">
            <th>USERNAME</th>
            <th>FIRST_NAME</th>
            <th>LAST_NAME</th>
            <th>EMAIL</th>
            {users.map((user) => < UserItem user={user}/>)}
        </table>
    )
}

export default UserList;