import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {render} from "react-dom";


class Menu extends React.Component {

    render() {

        return (

            <container>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to='/' className="link-light nav-link"> Users </Link>
                            <Link to='/projects' className="link-light nav-link"> Projects </Link>
                            <Link to='/todo' className="link-light nav-link"> TODO_list </Link>
                            <p className=" link-light nav-link">{this.props.username}</p>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </container>
        )
    }
}

export default Menu;

