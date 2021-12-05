import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {HashRouter, Link} from "react-router-dom";


const Menu = () => {
    return (
        <container>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to='/' className="link-light nav-link">Users</Link>
                        <Link to='/projects' className="link-light nav-link">Projects </Link>
                        <Link to='/todo' className="link-light nav-link">TODO_list </Link>
                        <Link to='/login' className="link-light nav-link">Login </Link>
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