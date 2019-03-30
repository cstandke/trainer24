import React from "react";
import {Link} from "react-router-dom"
import { Col, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
// import { Link } from "react-router-dom";

const courseCard = props => {
  let cardStyle = {
    // width: "18rem"
  };
  console.log(props);
  return (
    <Col md="3">
      <Link to={props.cardLink}>
      <Card style={cardStyle} className="shadow my-2">
        {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
        <CardImg
          className="bg-secondary p-5 text-light"
          src={props.cardImage}
          alt={props.cardImage}
        />
        <CardBody>
          <CardTitle tag="h5">{props.cardTitle}</CardTitle>
          <CardText>{props.cardText}</CardText>
        </CardBody>
      </Card>
      </Link>
    </Col>
  );
};

export default courseCard;
