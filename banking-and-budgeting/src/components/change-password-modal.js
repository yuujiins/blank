import {Button, Col, Form, FormGroup, Modal, Row} from "react-bootstrap";
import DwForm from "./dw-form";
import SendForm from "./send-form";
import {Link} from "react-router-dom";

const ChangePasswordModal = (props) => {

    return(
        <Modal show={props.show} onHide={props.handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="changePasswordForm">
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="cpOldPassword">Old Password<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" id="cpOldPassword" name="cpOldPassword" placeholder="Your old password" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="cpNewPassword">New Password<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" id="cpNewPassword" name="cpNewPassword" placeholder="New password" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="cpRetypePassword">Retype New Password<span className="text-danger">*</span></Form.Label>
                                <Form.Control type="password" id="retypeNewPassword" name="retypeNewPassword" placeholder="Retype your new password" required/>
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
export default ChangePasswordModal;