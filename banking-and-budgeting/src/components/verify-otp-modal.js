import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect} from "react";
import {checkOTP} from "../services/account";
import {toast} from "react-toastify";

const VerifyOtpModal = (props) => {

    useEffect(() => {

    });
    return (
        <Modal show={props.show} onHide={props.onHide} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Verify OTP</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="verifyOTPForm" onSubmit={props.onVerifyOTP}>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="verifyOTP">Enter OTP<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" id="verifyOTP" name="verifyOTP" placeholder="Enter OTP" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Button type="button" variant="link" onClick={props.resendOTP}>Resend OTP</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" variant="primary" className="formButtonAdj">Save Changes</Button>
                            <Button type="reset" variant="warning" className="formButtonAdj">Reset</Button>
                        </Col>
                    </Row>

                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default VerifyOtpModal;