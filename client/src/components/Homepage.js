import React from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const homePage = () => {
  let card = {
    cardTitle: "Card title",
    cardText:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    cardImage: "Card Image"
  };

  let cardSpace = () => {
    return (
      <Row>
        <CourseCard card={card} />
        <CourseCard card={card} />
        <CourseCard card={card} />
      </Row>
    );
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
        <Button color="primary" size="lg" tag={Link} to="/login">
          Learn more
        </Button>
      </Jumbotron>

      <Container fluid={true} className="p-2">
        <h2 className="display-5 my-2 mb-4">Check out our classes:</h2>
        {cardSpace()}
      </Container>
    </div>
  );
};

export default homePage;
