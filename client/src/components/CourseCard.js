import React from "react";
import {Link} from "react-router-dom"
import { Col, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import defaultImage from "./images/course.png"
// import { Link } from "react-router-dom";

const courseCard = props => {
  let cardStyle = {
    // width: "18rem"
  };

  let cardLink = props.cardLink || "/OfferDetail";
  let cardImage = props.cardImage || defaultImage;
  let linkWrapper;

  let cardContents = function() {
    return (
      <Card style={cardStyle} className="shadow my-2">
        {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
        <CardImg
          className="bg-secondary p-5 text-light"
          src={cardImage}
          alt={cardImage}
        />
        <CardBody>
          <CardTitle tag="h5">{props.cardTitle}</CardTitle>
          <CardText>{props.cardText}</CardText>
        </CardBody>
      </Card>
    )
  } 
  // console.log(props);
  
  if (props.cardLink) {
    linkWrapper = (
      <Link to={cardLink}>
      {cardContents()}
    </Link>)
  } else {
    linkWrapper = cardContents()
  }
    
  
  return (
    <Col md="3">
      {linkWrapper}
    </Col>
  );
};

export default courseCard;
