import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import DwForm from "./dw-form";
import SendForm from "./send-form";
import {useEffect, useState} from "react";
import {getMobileNumber, resetPassword, sendForgotOTP, sendUpdateOTP, verifyOTP} from "../services/account";
import {toast} from "react-toastify";

const ForgotPasswordModal = (props) => {
    const [isOTPVerified, setOTPVerified] = useState(false)
    const [isOTPSent, setOTPSent] = useState(false)
    const [userId, setUserId] = useState()
    const [showModal, setShowModal] = useState(props.show)


    const verify = async () =>{
        const data = {
            email: document.querySelector('#forgotPasswordEmail').value
        }
        getMobileNumber(data)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.status === -1){
                    toast.error(data.message, {
                        position: 'top-center',
                        autoClose: '3000',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light'
                    })
                }
                else{
                    const updateOTP = {
                        otp: Math.floor(Math.random()*(999999-100000+1)+100000),
                        mobileNumber: data.mobileNumber,
                        userId: data.userId
                    }
                    sendForgotOTP(updateOTP)
                        .then(response => JSON.parse(response))
                        .then(d => {
                            if(d.status === 1){
                                toast.success(data.message, {
                                    position: 'top-center',
                                    autoClose: '3000',
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: false,
                                    progress: undefined,
                                    theme: 'light'
                                })
                                setUserId(data.userId)
                                setOTPSent(true)
                                console.log(userId)
                            }
                        })
                }
            })
    }

    const onVerifyOTP = async () => {
        console.log(userId)
        const data = {
            userId: userId,
            otp: document.querySelector('#forgotPasswordOTP').value
        }
        verifyOTP(data)
            .then(response => response)
            .then(data => {
                if(data.status === 1){
                    setOTPVerified(true)
                    toast.success(data.message, {
                        position: 'top-center',
                        autoClose: '3000',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'light'
                    })
                }
            })
    }

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault()
        const newPassword = document.querySelector('#forgotNewPassword').value
        const retypedPassword = document.querySelector('#forgotRetypePassword').value

        if(newPassword === retypedPassword){
            const data = {
                userId: userId,
                password: newPassword
            }
            resetPassword(data)
                .then(response => response.json())
                .then(data => {
                    if(data.status === 1){
                        toast.success(data.message, {
                            position: 'top-center',
                            autoClose: '3000',
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: false,
                            progress: undefined,
                            theme: 'light'
                        })
                        setUserId(null)
                        setOTPVerified(false)
                        setOTPSent(false)
                        props.handleModalClose()
                    }
                })
        }
        else{
            toast.error('Passwords do not match!', {
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
        }

    }
    return (
        <Modal show={props.show} onHide={props.handleModalClose}  backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Enter your new password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="forgotPasswordForm" onSubmit={handleForgotPasswordSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="forgotPasswordEmail">Enter your registered email<span className="text-danger">*</span> </Form.Label>
                                <Form.Control type="email" autoComplete="off" disabled={isOTPVerified} name="forgotPasswordEmail" id="forgotPasswordEmail" placeholder="required" required/>
                            </Form.Group>
                        </Col>
                        <Col md={3} className="d-flex align-items-center justify-content-center">
                            <Form.Group className="formGroup">
                                <Button type="button" onClick={verify} variant="info" disabled={isOTPVerified}>Send OTP</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    {isOTPSent === true &&
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="forgotPasswordOTP">Enter your OTP<span className="text-danger">*</span> </Form.Label>
                                        <Form.Control type="email" autoComplete="off" disabled={isOTPVerified} name="forgotPasswordOTP" id="forgotPasswordOTP" placeholder="required" required/>
                                    </Form.Group>
                                </Col>
                                <Col md={3} className="d-flex align-items-center justify-content-center">
                                    <Form.Group className="formGroup">
                                        <Button type="button" onClick={onVerifyOTP} variant="info" disabled={isOTPVerified}>Verify</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    }
                    {isOTPVerified === true &&
                        <div>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="forgotNewPassword">New Password<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="password" id="forgotNewPassword" name="forgotNewPassword" placeholder="Enter your new password" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Form.Label htmlFor="forgotRetypePassword">Retype Password<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="password" id="forgotRetypePassword" name="forgotRetypePassword" placeholder="Retype your new password" required/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="formGroup">
                                        <Button type="submit" className="formButtonAdj" variant="primary">Change Password</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ForgotPasswordModal;