import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import blankBlk from '../img/blank-blk.png';
import {useNavigate} from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();
    const [isLogged, setLogged] = useState(props.isLogged)
    const [tableView, setTableView] = useState(props.tableView)
    const [buttonView, setButtonView] = useState(props.buttonView)

    const handleLogout = () => {
        window.sessionStorage.clear();
        setLogged(false)
        navigate('/login', {
            replace: false
        })
    }

    useEffect(() => {
        if(window.sessionStorage.getItem("token") !== null){
            setLogged(true);
        }
        if(props.tableView === 'expenses'){
            setTableView('expenses')
        }
        else{
            setTableView('transactions')
        }
        if(props.buttonView === false){
            setButtonView(false)
        }
        else{
            setButtonView(true)
        }
    })

    return (
        <Navbar bg="default" variant="light" expand="lg">
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
                        {isLogged === false ? (<Button type="button" className="formGroup" onClick={ () => {navigate('/register', {replace: false})}} variant="info">Register</Button> ):(<Button type="button" onClick={handleLogout} className="formGroup" variant="danger">Logout</Button>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;