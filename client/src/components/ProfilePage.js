import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText /*  */
} from "reactstrap";
import CourseCard from "./CourseCard";
// import { Link } from "react-router-dom";
// import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.user = {
      firstName: "Jane",
      lastName: "Doe",
      occupation: "Life Coach and Trainer for just about everything",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat."
    };

    this.card = {
      cardTitle: "Card title",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardImage: "Card Image"
    };

    this.profileImageStyle = {
      backgroundImage:
        "url(https://mobirise.com/extensions/realtym4/assets/images/face4.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100px" //needs more work
    };
  }

  cardSpace() {
    return (
      <Row className="mt-4">
        <CourseCard card={this.card} />
        <CourseCard card={this.card} />
        <CourseCard card={this.card} />
      </Row>
    );
  }

  render() {
    return (
      <div>
        {/* <Nav id="#sidebar">Sidebar</Nav> */}
        <Container id="heading" className="text-center mt-4">
          <h1>My Profile</h1>
        </Container>

        {/* <Container>
          <Row className="mt-4">
            <Col
              sm="3"
              className="bg-primary shadow"
              style={this.profileImageStyle}
            >
            </Col>
            <Col sm="8" className="py-3 px-4 shadow">
              <h2 className="text-primary mt-2">
                {this.user.firstName} {this.user.lastName}
              </h2>
              <h4 className="text-secondary my-2">{this.user.occupation}</h4>
              <p className="text-secondary mt-3">{this.user.description}</p>
            </Col>
          </Row>
        </Container> */}

        <Container>
          <Row className="mt-3"  >
            <Card mb="4" className="shadow d-flex flex-md-row"> 
              {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
              <CardImg
                className="bg-secondary text-light"
                src="https://mobirise.com/extensions/realtym4/assets/images/face4.jpg"
                alt="https://mobirise.com/extensions/realtym4/assets/images/face4.jpg"
                // style={{height:"25vh"}}
              />
              <CardBody>
                {/* <CardTitle tag="h5">{props.card.cardTitle}</CardTitle> */}
                <CardText>
                  <h2 className="text-primary mt-2">
                    {this.user.firstName} {this.user.lastName}
                  </h2>
                  <h4 className="text-secondary my-2">
                    {this.user.occupation}
                  </h4>
                  <p className="text-secondary mt-3">{this.user.description}</p>
                </CardText>
              </CardBody>
            </Card>
          </Row>
        </Container>

        <Container id="content" className="mt-3">
          <h2> My Offers</h2>
          {this.cardSpace()}
          <hr className="mt-5 mb-5" />
          <h2> Courses history</h2>
          {this.cardSpace()}
        </Container>
      </div>
    );
  }
}
export default ProfilePage;
