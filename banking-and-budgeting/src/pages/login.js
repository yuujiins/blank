import {Button, Card, Carousel, Col, Figure, Form, FormGroup, FormLabel, FormText, Image, Row} from "react-bootstrap";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import convenience from "../img/24h-4.jpg";
import secure from "../img/lock.jpg";
import fast from "../img/thunderbolt.jpg";
import LandingText from "../components/landing-text";

const Login = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(window.sessionStorage.getItem("token") !== null){
            navigate('/', {
                replace: false
            })
        }
        else{
            document.title = "Blank - Login"
        }
    });
    return(
        <Row style={{padding: "50px", margin: "0"}}>
            <LandingText/>
            <Col md={6} className="text-start">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            <h5>Please log in to continue</h5>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form id="loginForm" onSubmit={props.handleLogin}>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control type="email" autoComplete="off" name="email" id="email" placeholder="someone@example.com" required/>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control type="password" name="password" id="password" placeholder="Enter your super secure password" required/>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Button type="submit" variant="primary">Sign in</Button>

                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Text>New here? <Link to='/register'>Register here!</Link></Form.Text>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;