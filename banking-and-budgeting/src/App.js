import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Header from "./components/header";
import {useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import Login from "./pages/login";
import Footer from "./components/footer";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import {register, login, checkOTP, verifyOTP} from "./services/account";
import VerifyOtpModal from "./components/verify-otp-modal";
import {toast} from "react-toastify";
import Landing from "./pages/landing";

function App() {
    const [isLogged, setLogged] = useState(false)
    const [tableView, setTableView] = useState('transactions')
    const [buttonView, setButtonView] = useState(true)
    const [otpSent, setOtpSent] = useState(false)
    const [userId, setUserId] = useState(null)

    const verifyOTPForm = async (e) =>{
        e.preventDefault();
        console.log(userId)
        const data = {
            userId: userId,
            otp: document.querySelector('#verifyOTP').value
        }
        const result = await verifyOTP(data)
        if(result.status === 1){
            toast.success('Account verified successfully! You may now log in',{
                position: 'top-center',
                autoClose: '3000',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'light'
            })
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
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }
        const result = await login(data);
        console.log(result)
        if(result.status !== 1){
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
        else{
            console.log(result)
            if(result.isMobileVerified === false){
                const data = {
                    userId: result._id,
                    mobileNumber: result.mobileNumber
                }
                const r = await checkOTP(data)
                if(r.status === 1){
                    toast.success('A new OTP has been sent to your mobile number', {
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
                setOtpSent(true)
                setUserId(result._id);
            }
            else{
                window.sessionStorage.setItem('address', result.address);
                window.sessionStorage.setItem('birthDay', result.birthDay);
                window.sessionStorage.setItem('email', result.email)
                window.sessionStorage.setItem('firstName', result.firstName);
                window.sessionStorage.setItem('middleName', result.middleName);
                window.sessionStorage.setItem('lastName', result.lastName);
                window.sessionStorage.setItem('mobileNumber', result.mobileNumber);
                window.sessionStorage.setItem('token', result.token);
                window.sessionStorage.setItem('cardNumber', result.accountData.cardNumber[0])
                window.sessionStorage.setItem('funds', result.accountData.funds)
                window.sessionStorage.setItem('cvv', result.accountData.CVV)
                window.sessionStorage.setItem('userId', result._id);

                toast.success(`Welcome, ${result.firstName} ${result.lastName}!`, {
                    position: 'top-center',
                    autoClose: '3000',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'light'
                })
                window.location.href='/dashboard';
            }
        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        const data = {
            firstName: document.querySelector('#registerFirstName').value,
            middleName: document.querySelector('#registerMiddleName').value,
            lastName: document.querySelector('#registerLastName').value,
            address: document.querySelector('#registerAddress').value,
            birthDay: document.querySelector('#registerBirthday').value,
            email: document.querySelector('#registerEmail').value,
            mobileNumber: document.querySelector('#registerNumber').value,
            password: document.querySelector('#registerPassword').value
        }
        if(document.querySelector('#registerPassword').value !== document.querySelector('#retypePassword').value){
            toast.error('Passwords do no match!', {
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
            const result = await register(data);
            if(result.status === 1){
                setOtpSent(true)
                console.log(result)
                setUserId(result.userId)
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
    }
    const toggleTableView = () => {
        if(tableView === 'transactions'){
            setTableView('expenses')
        }
        if(tableView === 'expenses'){
            setTableView('transactions')
        }
    }
    const otpModalHide = () => {
        setOtpSent(false)
    }
    useEffect(() => {
        if(window.sessionStorage.getItem("token") !== null){
            setLogged(true);
        }
        else{

        }
        if(document.title === 'Blank - Profile'){
            setButtonView(false)
        }
        if(document.title === 'Blank'){
            console.log('landing')
            setButtonView(false)
        }
    })
  return (
    <div className="App" style={{fontFamily: "Gotham"}}>
      <BrowserRouter>
          <VerifyOtpModal show={otpSent} onHide={otpModalHide} userId={userId} onVerifyOTP={verifyOTPForm}/>
          <Header isLogged={isLogged} buttonView={buttonView} toggleTableView={toggleTableView} tableView={tableView}/>
          <Footer/>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login handleLogin={handleLogin} />}/>
            <Route path="/register" element={<Register handleRegister={handleRegister}/>}/>
            <Route path="/dashboard" element={<Dashboard tableView={tableView} toggleTableView={toggleTableView}/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
        <Container>
            <Row>
                <Outlet/>
            </Row>
        </Container>
    </div>
  );
}

export default App;
