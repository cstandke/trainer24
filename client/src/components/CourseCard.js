import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, CardImg, CardBody, CardTitle, CardText, Container } from "reactstrap";
import defaultImage from "./images/course.png";
// import { Link } from "react-router-dom";

const courseCard = props => {
  let cardImageStyle = {
    maxHeight:"100%",
    maxWidth:"100%",
    width:"auto"
  };

  let cardImageWrapperStyle = {
    height:"100px",
    width:"100",
    textAlign:"center"
  }

  let cardLink = props.cardLink || "/OfferDetail";
  let cardImage = props.cardImage || defaultImage;
  let cardTitle = props.cardTitle || "";
  let cardText = props.cardText || "";
  let linkWrapper;

  let cardContents = function() { 
    return (
      <Card className="shadow my-2">
        {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
        <Container className="bg-primary" style={cardImageWrapperStyle}>
        <CardImg style={cardImageStyle} className="bg-secondary p-1 text-light d-block m-auto"
          src={cardImage}
          alt={cardImage}
        />
        </Container>
        <CardBody>
          <CardTitle tag="h5">{cardTitle.substr(0,100)}</CardTitle>
          <CardText>{cardText.substr(0,200)}</CardText>
        </CardBody>
      </Card>
    );
  };
  // console.log(props);

  if (props.cardLink) {
    linkWrapper = <Link to={cardLink}>{cardContents()}</Link>;
  } else {
    linkWrapper = cardContents();
  }

  return <Col md="3">{linkWrapper}</Col>;
};

export default courseCard;
