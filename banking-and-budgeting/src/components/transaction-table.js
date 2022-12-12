import {Button, Card, Col, Form, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import {useEffect} from "react";

const TransactionTable = (props) => {

    useEffect(() => {

    });
    return (
        <Card>
            <Card.Header>
                <h5>Your Transactions</h5>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={props.onSearch}>
                    <Form.Group className="formGroup">
                        <Row>
                            <Col md={1} className="text-start">
                                <Form.Label htmlFor="dtDateFrom">From</Form.Label>
                            </Col>
                            <Col className="text-start">
                                <Form.Control type="date" id="dtDateFrom" name="dtDateFrom" required/>
                            </Col>
                            <Col md={1} className="text-start">
                                <Form.Label htmlFor="dtDateTo">To</Form.Label>
                            </Col>
                            <Col className="text-start">
                                <Form.Control type="date" id="dtDateTo" name="dtDateTo" required/>
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

export default TransactionTable;