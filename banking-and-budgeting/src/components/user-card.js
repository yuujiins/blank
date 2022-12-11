import {Card, Col, Figure, Row} from "react-bootstrap";
import defaultPhoto from "../img/default.png";
import {Link} from "react-router-dom";

const UserCard = (props) => {
    return (
        <Card className="text-start">
            <Card.Header>
                <h5>Hello, User!</h5>
            </Card.Header>
            <Card.Body>
                <div className="text-center">
                    <Figure>
                        <Figure.Image
                            src={defaultPhoto}
                            className="rounded-circle"
                            style={{width: "100px", height: "auto"}}
                        />
                        <Figure.Caption>
                            <h5>User</h5>
                            <small>Joined December 2022</small>
                            <Row>
                                <Col>
                                    <Link to="/">View Profile</Link>
                                </Col>
                            </Row>
                        </Figure.Caption>
                    </Figure>
                </div>
            </Card.Body>
        </Card>
    );
}

export default UserCard;