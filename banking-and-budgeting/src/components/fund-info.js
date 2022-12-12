import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoneyBills, faMoneyBillTransfer, faPlus} from "@fortawesome/free-solid-svg-icons";

const FundInfo = (props) => {
    return (
        <Card>
            <Card.Body>
                <Card>
                    <Card.Body>
                        <div className="text-center">
                            <h3>{parseFloat(window.sessionStorage.getItem('funds'))}</h3>
                            <small>Available Balance</small>
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
        </Card>
    );
}

export default FundInfo;