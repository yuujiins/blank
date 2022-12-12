import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ChangePasswordModal from "../components/change-password-modal";
import {Link} from "react-router-dom";

const Profile = (props) => {
    const [cpModalShow, setCpModalShow] = useState(false);

    const onCpClick = () => {
        setCpModalShow(true)
    }
    const onCpHide = () => {
        setCpModalShow(false)
    }
    useEffect(() => {
        document.title = "Blank - Profile"
    })
    return (
        <div className="d-flex flex-column align-items-center">
            <ChangePasswordModal show={cpModalShow} handleClose={onCpHide}/>
            <Row style={{padding: "50px", margin: 0}}>
                <h3>Your Profile Details</h3>
            </Row>
            <Row className="d-flex flex-column align-items-center">
                <Col md={12}>
                    <Form id="profileForm" style={{paddingTop: "30px"}}>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileLastName">Last Name</Form.Label>
                                    <Form.Control type="text" name="profileLastName" id="profileLastName" placeholder="Your last name" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileFirstName">First Name</Form.Label>
                                    <Form.Control type="text" name="profileFirstName" id="profileFirstName" placeholder="Your first name" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileMiddleName">Middle Name</Form.Label>
                                    <Form.Control type="text" name="profileMiddleName" id="profileMiddleName" placeholder="Your middle name"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileAddress">Address</Form.Label>
                                    <Form.Control name="profileAddress" id="profileAddress" type="text" placeholder="optional"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileBirthDay">Birthday</Form.Label>
                                    <Form.Control type="date" name="profileBirthday" id="profileBirthday" disabled/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileEmail">Email</Form.Label>
                                    <Form.Control type="email" name="profileEmail" id="profileEmail" placeholder="Your email" disabled/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileNumber">Mobile Number</Form.Label>
                                    <Form.Control type="text" name="profileNumber" id="profileNUmber" pattern="[0-9]{11}" title="Only numbers are allowed" placeholder="Your mobile number" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" variant="primary" className="formButtonAdj">Save Changes</Button>
                                <Button type="button" variant="warning" onClick={onCpClick} className="formButtonAdj">Change Password</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Link to='/dashboard'>Return to Dashboard</Link>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;