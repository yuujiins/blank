import {Card, Col, Figure, Row} from "react-bootstrap";
import defaultPhoto from "../img/default.png";
import {Link} from "react-router-dom";
import UserCard from "../components/user-card";
import {useEffect} from "react";
import blankBlk from "../img/blank-blk.png";
import visaLogo from "../img/visa-logo.png";
import VirtualCard from "../components/virtual-card";
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
                  <Col md={4}>
                    <VirtualCard/>
                  </Col>
                  <Col>

                  </Col>
              </Col>
          </Row>
      </Row>
    );
}

export default Dashboard;