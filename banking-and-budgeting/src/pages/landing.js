import {useEffect, useState} from "react";
import blankBlk from "../img/blank-blk.png"
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
const Landing = (props) => {
    const navigate = useNavigate()
    const [isLogged, setLogged] = useState(false)

    useEffect(() => {
        document.title = 'Blank'
        if(window.sessionStorage.getItem('token') !== null){
            setLogged(true)
        }
    })

    return (
        <div style={{width: "100vw", height: "80vh", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center"}}>
            <h1>This page is left intentionally</h1>
            <img src={blankBlk}/>
            <br/>
            {isLogged === true ? <Button onClick={() => {navigate('/dashboard', {replace: false})}} type="button">Go to dashboard</Button> : <Button type="button" onClick={() => {navigate('/login', {replace: false})}}>Login</Button>}
        </div>
    );
}

export default Landing;