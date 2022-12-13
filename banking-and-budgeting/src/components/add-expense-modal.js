import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import DwForm from "./dw-form";
import SendForm from "./send-form";

const AddExpenseModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} backdrop='static' keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="addExpenseForm" onSubmit={props.addExpenseSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="expenseDescription">Description</Form.Label>
                                <Form.Control type="text" name="expenseDescription" id="expenseDescription" placeholder="Describe your spending" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="expenseAmount">Amount</Form.Label>
                                <Form.Control type="number" step="0.01" min="1" name="expenseAmount" id="expenseAmount" placeholder="Amount spent" required/>
                            </Form.Group>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="expenseDate">Expense Date</Form.Label>
                                <Form.Control type="date" name="expenseDate" id="expenseDate" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Form.Label htmlFor="expenseType">Type of Expense</Form.Label>
                                <Form.Select type="select" name="expenseType" id="expenseType">
                                    <option value="">--Please Select--</option>
                                    <option value="bills">Bills Payment</option>
                                    <option value="utilities">Utilities Payment</option>
                                    <option value="rent">Rents</option>
                                    <option value="leisure">Leisure and Entertainment</option>
                                    <option value="others">Others</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="formGroup">
                                <Button type="submit" variant="primary" className="formButtonAdj">Add</Button>
                                <Button type="reset" variant="warning" className="formButtonAdj">Reset</Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddExpenseModal;