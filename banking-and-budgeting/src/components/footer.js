import {Container, Navbar} from "react-bootstrap";

const Footer = () => {
    return(
        <Navbar fixed="bottom" expand="lg" variant="light" bg="light">
            <Container className="text-center">
                Blank - your all-in-one banking solution
                <small>
                    &copy; {new Date().getFullYear()}
                </small>
            </Container>
        </Navbar>
    );
}

export default Footer;