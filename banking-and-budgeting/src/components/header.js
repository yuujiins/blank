import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import blankBlk from '../img/blank-blk.png';

const Header = (props) => {
    const [isLogged, setLogged] = useState(props.isLogged)

    useEffect(() => {
        if(window.sessionStorage.getItem("token") !== null){
            setLogged(true);
        }
    })

    return (
        <Navbar bg="default" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={blankBlk} style={{width: "60px", height: "auto"}}/>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                        {isLogged === false ? (<Button type="button" variant="info">Register</Button> ):(<Button type="button" variant="danger">Logout</Button>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;