import {Button, Card, Col, Form, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ExpensesTable = (props) => {
    return (
        <Card>
            <Card.Header>
                <h5 className="float-start">Your Expenses</h5>
                <Button type="button" variant="info" onClick={props.onAddExpenseClick} className="btn-sm float-end"><FontAwesomeIcon icon={faPlus}/> Add</Button>
            </Card.Header>
            <Card.Body>
                <Form id="expensesSearch" onReset={props.onReset} onSubmit={props.onSearch}>
                    <Form.Group className="formGroup">
                        <Row>
                            <Col md={1} className="text-start">
                                <Form.Label htmlFor="edtDateFrom">From</Form.Label>
                            </Col>
                            <Col className="text-start">
                                <Form.Control type="date" id="edtDateFrom" name="edtDateFrom" required/>
                            </Col>
                            <Col md={1} className="text-start">
                                <Form.Label htmlFor="edtDateTo">To</Form.Label>
                            </Col>
                            <Col className="text-start">
                                <Form.Control type="date" id="edtDateTo" name="edtDateTo" required/>
                            </Col>
                            <Col>
                                <Button type="submit" variant="primary" className="formButtonAdj">Search</Button>
                                <Button type="reset" variant="warning">Reset</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                <DataTable columns={props.columns} data={props.data} pagination/>
            </Card.Body>
        </Card>
    );
}

export default ExpensesTable;