import {Col, Figure, Row} from "react-bootstrap";
import convenience from "../img/24h-4.jpg";
import secure from "../img/lock.jpg";
import fast from "../img/thunderbolt.jpg";

const LandingText = () => {
    return(
        <Col md={6}>
            <Row>
                <Col>
                    <h2><strong>Welcome!</strong></h2>
                    <h4>it all starts with a blank</h4>
                    <small>and three starting points</small>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Figure>
                        <Figure.Image
                            width={100}
                            height="auto"
                            src={convenience}
                        />
                        <Figure.Caption>
                            Convenient
                        </Figure.Caption>
                    </Figure>
                    <Figure>
                        <Figure.Image
                            width={100}
                            height="auto"
                            src={secure}
                        />
                        <Figure.Caption>
                            Secure
                        </Figure.Caption>
                    </Figure>
                    <Figure>
                        <Figure.Image
                            width={120}
                            height="auto"
                            src={fast}
                        />
                        <Figure.Caption>
                            Fast
                        </Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </Col>
    );
}

export default LandingText;