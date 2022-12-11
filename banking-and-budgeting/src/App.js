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

function App() {
    const [isLogged, setLogged] = useState(false)
    const handleLogin = (e) => {
        e.preventDefault()
        alert("Login")
    }
    const handleRegister = (e) => {
        e.preventDefault()
        alert("Register")
    }
    useEffect(() => {
        if(window.sessionStorage.getItem("token") !== null){
            setLogged(true);
        }
        else{

        }
    })
  return (
    <div className="App" style={{fontFamily: "Gotham"}}>
      <BrowserRouter>
          <Header isLogged={isLogged}/>
          <Footer/>
        <Routes>
            <Route path="/" element=""/>
            <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/register" element={<Register handleRegister={handleRegister}/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
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
