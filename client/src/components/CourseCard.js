import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";
// import { Link } from "react-router-dom";

const courseCard = props => {
  let cardStyle = {
    // width: "18rem"
  };
  // console.log(props);
  return (
    <Col md="3">
      <Card mb="4" style={cardStyle} className="shadow">
        {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
        <CardImg
          className="bg-secondary p-5 text-light"
          src={props.card.cardImage}
          alt={props.card.cardImage}
        />
        <CardBody>
          <CardTitle tag="h5">{props.card.cardTitle}</CardTitle>
          <CardText>{props.card.cardText}</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default courseCard;
