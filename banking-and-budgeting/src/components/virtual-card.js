import {Card} from "react-bootstrap";
import blankBlk from "../img/blank-blk.png";
import visaLogo from "../img/visa-logo.png";

const VirtualCard = (props) => {
    return (
        <Card>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <div className="virtual-card d-flex flex-column">
                    <div className="card-top align-self-start" style={{height: "20%"}}>
                        <img src={blankBlk} style={{width: "45px", height: "auto"}}/>
                    </div>
                    <div className="card-center d-flex justify-content-end flex-column" style={{height: "60%"}}>
                        <h5 className="align-self-start" style={{height: "50%"}}>4895 0404 8534 7773</h5>
                        <div className="align-self-start d-flex" style={{height: "10%"}}>
                            <div className="d-flex flex-column">
                                <small>JUAN DELA CRUZ</small>
                                <small>Valid thru: 09/29</small>
                            </div>
                            <div className="" style={{paddingLeft: "30px"}}>
                                <small>CVV: 394</small>
                            </div>
                        </div>
                    </div>
                    <div className="card-bottom align-self-end" style={{height: "20%", paddingTop: "20px"}}>
                        <img src={visaLogo} style={{width: "40px", height: "auto"}}/>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer>
                <small>Your virtual Card</small>
            </Card.Footer>
        </Card>
    );
}

export default VirtualCard;