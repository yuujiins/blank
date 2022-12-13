import {Form} from "react-bootstrap";

const SendForm = (props) => {
    return (
        <Form id="sendForm"  onSubmit={props.onSubmitSendForm}>
            <Form.Group className="formGroup">
                <Form.Label htmlFor="sendRecipientEmail">Recipient Email</Form.Label>
                <Form.Control type="email" autoComplete="off" name="sendRecipientEmail" id="sendRecipientEmail" placeholder="recipient@example.com" required/>
            </Form.Group>
            <Form.Group className="formGroup">
                <Form.Label htmlFor="sendAmount">Amount</Form.Label>
                <Form.Control type="number" step="0.01" id="sendAmount" name="sendAmount" min="0.00" placeholder="Enter amount" required/>
            </Form.Group>
        </Form>
    );
}

export default SendForm;