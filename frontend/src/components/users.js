import React from "react";


const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return(
        <table>
            <th><b>USERNAME</b></th>
            <th>FIRST_NAME</th>
            <th>LAST_NAME</th>
            <th>EMAIL</th>
            {users.map((user) => < UserItem user={user} />)}
        </table>
    )
}

export default UserList;