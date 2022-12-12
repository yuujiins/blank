import {Button, Form} from "react-bootstrap";

const DwForm = (props) => {

    return(
        <Form id="dwForm"  onSubmit={props.onSubmitDwForm}>
            <Form.Group className="formGroup">
                <Form.Label htmlFor="dwAmount">Amount</Form.Label>
                <Form.Control type="number" id="dwAmount" name="dwAmount" step="0.1" min="0.00" placeholder="Enter amount" required/>
            </Form.Group>
        </Form>
    );
}

export default DwForm;