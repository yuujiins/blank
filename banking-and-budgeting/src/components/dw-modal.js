import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import DwForm from "./dw-form";
import SendForm from "./send-form";

const DwModal = (props) => {
    const handleModelButton = () => {
        const modalButton = document.querySelector('#modalButton')
        if(props.mode === 'deposit' || props.mode === 'withdraw'){
            modalButton.setAttribute("form", "dwForm");
        }
        if(props.mode === 'send'){
            modalButton.setAttribute("form", "sendForm");
        }
    }
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{props.mode === 'deposit' ?
                                    'Deposit Funds': props.mode === 'withdraw' ?
                                                'Withdraw Funds' : 'Send Money'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.mode === 'deposit' || props.mode === 'withdraw' ? <DwForm mode={props.mode} onSubmitDwForm={props.dwSubmit}/> : <SendForm onSubmitSendForm={props.sendFormSubmit}/>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button id="modalButton" type="submit" variant="primary" onClick={handleModelButton}>
                    {props.mode === 'deposit' ?
                            'Deposit' : props.mode === 'withdraw' ?
                                        'Withdraw' : 'Send'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DwModal;