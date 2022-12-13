import {Badge, Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import ChangePasswordModal from "../components/change-password-modal";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import VerifyOtpModal from "../components/verify-otp-modal";
import {sendUpdateOTP, updatePassword, updateProfile, verifyOTP} from "../services/account";

const Profile = (props) => {
    const st = window.sessionStorage;
    const d = document;
    const [cpModalShow, setCpModalShow] = useState(false);
    const [mobileNumberChangedValue, setMobileNumberChangedValue] = useState(st.getItem('mobileNumber'));
    const [isMobileNumberChanged, setMobileNumberChanged] = useState(false);
    const [otpSent, setOtpSent] = useState(false)
    const [isNumberVerified, setNumberVerified] = useState(true)

    const changeMobileNumber = (e) => {
        setMobileNumberChangedValue(e.target.value)
        if(st.getItem('mobileNumber') === e.target.value){
            setMobileNumberChanged(false)
            setNumberVerified(true)
        }
        else{
            setMobileNumberChanged(true)
            setNumberVerified(false)
        }
    }

    const isUnchanged = () => {
        if(st.getItem('lastName') === d.querySelector('#profileLastName').value
            && st.getItem('firstName') === d.querySelector('#profileFirstName').value
            && st.getItem('middleName') === d.querySelector('#profileMiddleName').value
            && st.getItem('address') === d.querySelector('#profileAddress').value
            && isMobileNumberChanged === false
            ){

            return true;
        }
        return false;
    }

    const onCpClick = () => {
        setCpModalShow(true)
    }
    const onCpHide = () => {
        setCpModalShow(false)
    }
    const updateProfileSubmit = async (e) => {
        e.preventDefault()
        if(isUnchanged()){
            toast.info('Profile information is unchanged', {
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
            if(isMobileNumberChanged === true){
                sendUpdateOTP({
                    userId: st.getItem('userId'),
                    otp: Math.floor(Math.random()*(999999-100000+1)+100000),
                    mobileNumber: d.querySelector('#profileNumber').value
                })
                    .then(response => JSON.parse(response))
                    .then(data => {
                        console.log(data)
                        if(data.status === 1){
                            setOtpSent(true)
                        }
                    })
            }
            else{
                await updateProfileData();
            }
        }
    }
    const updateProfileData = async () => {
        const updatedData = {
            lastName: d.querySelector('#profileLastName').value,
            firstName: d.querySelector('#profileFirstName').value,
            middleName: d.querySelector('#profileMiddleName').value,
            address: d.querySelector('#profileAddress').value,
            mobileNumber: d.querySelector('#profileNumber').value
        }
        const result = await updateProfile(updatedData)
        if(result.status === 1){
            toast.success(result.message,{
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
            st.setItem('lastName', d.querySelector('#profileLastName').value)
            st.setItem('firstName', d.querySelector('#profileFirstName').value)
            st.setItem('middleName', d.querySelector('#profileMiddleName').value)
            st.setItem('address', d.querySelector('#profileAddress').value)
            st.setItem('mobileNumber', d.querySelector('#profileNumber').value)
            setNumberVerified(true)
        }
        else{
            toast.error(result.message, {
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
    const onSubmitOtp = async (e) => {
        e.preventDefault()
        const data = {
            userId: st.getItem('userId'),
            otp: d.querySelector('#verifyOTP').value
        }
        const result = await verifyOTP(data)
        if(result.status === 1){

            //update profile info
            await updateProfileData()
            setOtpSent(false)
        }
        else{
            toast.error('Incorrect OTP', {
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
    const submitChangePassword = async (e) => {
        e.preventDefault()
        const oldPassword = d.querySelector('#cpOldPassword').value
        const newPassword = d.querySelector('#cpNewPassword').value
        const retypedPassword = d.querySelector('#retypeNewPassword').value
        if(newPassword !== retypedPassword){
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
        else{
            const data = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            const result = await updatePassword(data)
            const r = await JSON.parse(result)
            console.log(r)
            if(r.status === 1){
                toast.success(r.message, {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
                setCpModalShow(false)
            }
            else{
                toast.error(r.message, {
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
    }
    useEffect(() => {
        document.title = "Blank - Profile"
    })
    return (
        <div className="d-flex flex-column align-items-center">
            <VerifyOtpModal show={otpSent} onVerifyOTP={onSubmitOtp}/>
            <ChangePasswordModal show={cpModalShow} handleClose={onCpHide} onSubmitCP={submitChangePassword}/>
            <Row style={{padding: "50px", margin: 0}}>
                <h3>Your Profile Details</h3>
            </Row>
            <Row className="d-flex flex-column align-items-center">
                <Col md={12}>
                    <Form id="profileForm" onSubmit={updateProfileSubmit} style={{paddingTop: "30px"}}>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileLastName">Last Name</Form.Label>
                                    <Form.Control type="text" defaultValue={window.sessionStorage.getItem('lastName')} name="profileLastName" id="profileLastName" placeholder="Your last name" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileFirstName">First Name</Form.Label>
                                    <Form.Control type="text" defaultValue={window.sessionStorage.getItem('firstName')} name="profileFirstName" id="profileFirstName" placeholder="Your first name" required/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileMiddleName">Middle Name</Form.Label>
                                    <Form.Control type="text" defaultValue={window.sessionStorage.getItem('middleName')} name="profileMiddleName" id="profileMiddleName" placeholder="Your middle name"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileAddress">Address</Form.Label>
                                    <Form.Control name="profileAddress"  defaultValue={window.sessionStorage.getItem('address')} id="profileAddress" type="text" placeholder="optional"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileBirthDay">Birthday</Form.Label>
                                    <Form.Control type="date"  defaultValue={window.sessionStorage.getItem('birthDay')} name="profileBirthday" id="profileBirthday" disabled/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="text-start">
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileEmail">Email</Form.Label>
                                    <Form.Control type="email" defaultValue={window.sessionStorage.getItem('email')} name="profileEmail" id="profileEmail" placeholder="Your email" disabled/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="formGroup">
                                    <Form.Label htmlFor="profileNumber">Mobile Number {isNumberVerified === true && <small className="text-success"><Badge bg="success">VERIFIED</Badge></small>}</Form.Label>
                                    <Form.Control type="text" onChange={changeMobileNumber} value={mobileNumberChangedValue} maxLength="11" name="profileNumber" id="profileNumber" pattern="[0-9]{11}" title="Only numbers are allowed" placeholder="Your mobile number" required/>
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