import React from "react";
import {Navbar, Nav, Link} from "react-bootstrap";


const Menu = () => {
    return (
        <container>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>Users</Nav.Link>
                        <Nav.Link>Projects</Nav.Link>
                        <Nav.Link>TODO_lists</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </container>
    )
}
export default Menu;


                        // <Nav.Link><Link to="/users">Users</Link></Nav.Link>
                        // <Nav.Link><Link to="/projects">Projects</Link></Nav.Link>
                        // <Nav.Link><Link to="/todo_lists">TODO_lists</Link></Nav.Link>