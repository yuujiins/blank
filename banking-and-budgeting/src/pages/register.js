import {useEffect, useState} from "react";
import LandingText from "../components/landing-text";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import VerifyOtpModal from "../components/verify-otp-modal";

const Register = (props) => {
    const [isLogged, setLogged] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    useEffect(() => {
        document.title = "Blank - Register"
    })
    return(
        <Row style={{padding: "50px", margin: 0}}>
            <VerifyOtpModal show={otpSent}/>
            <LandingText/>
            <Col md={6} className="text-start">
                <Card>
                    <Card.Header>
                        <Card.Title>
                            <h5>Enter your information</h5>
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form id="loginForm" onSubmit={props.handleRegister}>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerFirstName">First Name<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" autoComplete="off" name="registerFirstName" id="registerFirstName" placeholder="John" required/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerMiddleName">Middle Name</Form.Label>
                                        <Form.Control type="text" autoComplete="off" name="registerMiddleName" id="registerMiddleName" placeholder="optional"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerLastName">Last Name<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" autoComplete="off" name="registerLastName" id="registerLastName" placeholder="Doe"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerAddress">Address</Form.Label>
                                        <Form.Control type="text" autoComplete="off" name="registerAddress" id="registerAddress" placeholder="optional"/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerBirthday">Birthday<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="date" name="registerBirthday" id="registerBirthday" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="email">Email<span className="text-danger">*</span> </Form.Label>
                                        <Form.Control type="email" autoComplete="off" name="email" id="registerEmail" placeholder="someone@example.com" required/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerNumber">Mobile Number<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="text" autoComplete="off" name="registerNumber" id="registerNumber" maxLength="11" title="Only numbers are allowed" pattern="[0-9]{11}" placeholder="091712345678" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="registerPassword">Password<span className="text-danger">*</span> </Form.Label>
                                        <Form.Control type="password" name="registerPassword" id="registerPassword" placeholder="Enter your super secure password" required/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="retypePassword">Retype Password<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="password" name="retypePassword" id="retypePassword" placeholder="Retype your password" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="formGroup">
                                <Button className="formButtonAdj" type="submit" variant="primary">Register</Button>
                                <Button className="formButtonAdj" type="reset" variant="warning">Reset</Button>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Text>Already have an account? <Link to='/login'>Sign in here!</Link></Form.Text>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;