import {Button, Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBills, faMoneyBillTransfer, faPlus, faRotate} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

const FundInfo = (props) => {
    const [tableView, setTableView] = useState(props.tableView)

    useEffect(() => {
        setTableView(props.tableView)
    })
    return (
        <Card>
            <Card.Body>
                <Card>
                    <Card.Body>
                        <div className="text-center">
                            <h3>Php {(Math.round(parseFloat(props.currentBalance) * 100) / 100).toFixed(2)}</h3>
                            <small>Available Balance</small><br/>
                            <Button type="button" variant="link" onClick={props.reloadBalance}><FontAwesomeIcon icon={faRotate}/> Refresh</Button>
                        </div>
                    </Card.Body>
                </Card>
                <div className="d-flex justify-content-center">
                    <div className="dashboard-actions text-center" onClick={props.onDepositClick}>
                        <h2><FontAwesomeIcon icon={faPlus}/></h2>
                        <small>Cash In</small>
                    </div>
                    <div className="dashboard-actions text-center" onClick={props.onWithdrawClick}>
                        <h2><FontAwesomeIcon icon={faMoneyBills}/></h2>
                        <small>Cash Out</small>
                    </div>
                    <div className="dashboard-actions text-center" onClick={props.onSendClick}>
                        <h2><FontAwesomeIcon icon={faMoneyBillTransfer}/></h2>
                        <small>Send</small>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button type="button" onClick={props.toggleTableView}>
                            {tableView === 'transactions' ? 'View Expenses' : 'View Transactions'}
                        </Button>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
}

export default FundInfo;