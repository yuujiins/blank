import {Card, Col, Figure, Row} from "react-bootstrap";
import defaultPhoto from "../img/default.png";
import {Link} from "react-router-dom";
import UserCard from "../components/user-card";
import {useEffect} from "react";
import blankBlk from "../img/blank-blk.png";
import visaLogo from "../img/visa-logo.png";
import VirtualCard from "../components/virtual-card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons";
import {faMoneyBills, faMoneyBillTransfer, faPlus} from "@fortawesome/free-solid-svg-icons";
const Dashboard = (props) => {

    useEffect(() => {
        document.title = "Blank - Dashboard"
    })
    return (
      <Row style={{padding: "50px", margin: 0}}>
          <h1>Your Dashboard</h1>
          <Row>
              <Col md={3}>
                <UserCard/>
              </Col>
              <Col>
                  <Row>
                      <Col md={4}>
                          <VirtualCard/>
                      </Col>
                      <Col>
                          <Card>
                              <Card.Body>
                                  <Card>
                                      <Card.Body>
                                          <div className="text-center">
                                              <h3>Php 1200.54</h3>
                                              <small>Available Balance</small>
                                          </div>
                                      </Card.Body>
                                  </Card>
                                  <div className="d-flex justify-content-center">
                                      <div className="dashboard-actions text-center">
                                          <h2><FontAwesomeIcon icon={faPlus}/></h2>
                                          <small>Cash In</small>
                                      </div>
                                      <div className="dashboard-actions text-center">
                                          <h2><FontAwesomeIcon icon={faMoneyBills}/></h2>
                                          <small>Cash Out</small>
                                      </div>
                                      <div className="dashboard-actions text-center">
                                          <h2><FontAwesomeIcon icon={faMoneyBillTransfer}/></h2>
                                          <small>Send</small>
                                      </div>
                                  </div>
                              </Card.Body>
                          </Card>
                      </Col>
                  </Row>
              </Col>
          </Row>
      </Row>
    );
}

export default Dashboard;