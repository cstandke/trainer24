import React from "react";
import { Jumbotron, Button, Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText} from "reactstrap";
import { Link } from "react-router-dom";

const homePage = () => {
  let cardStyle = {
    // width: "18rem"
  };

  let card = {
    cardTitle: "Card title",
    cardText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    cardImage: "Card Image"
  };

  let cardArray = [];

  const cards = () => {
    cardArray.push(card);
    cardArray.push(card);
    cardArray.push(card);

    return cardArray.map(el => {
      return (
        <Col md="3">
          <Card mb="4" style={cardStyle}>
            {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
            <CardImg className="bg-secondary p-5 text-light" src={el.cardImage} alt={el.cardImage}/>
            <CardBody>
              <CardTitle tag="h5">{el.cardTitle}</CardTitle>
              <CardText>{el.cardText}</CardText>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div>
      <Jumbotron>
        <h1 className="display-4">Trainer24</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-4" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <Button color="primary" size="lg" tag={Link} to="/login">Learn more</Button>
      </Jumbotron>

      <Container fluid="true" className="p-2">
        <h2 className="display-5 my-2 mb-4">Check out our classes:</h2>
        <Row>
          {/* Cards go here */}
          {cards()}
        </Row>
      </Container>
    </div>
  );
};

export default homePage;
