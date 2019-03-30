import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  CardImg,
  CardBody,
  CardText /*  */
} from "reactstrap";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";

// import axios from "axios";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "mii",
      lastName: "",
      occupation: "Trainer, Lifelong Learner, Wizzard",
      description: "Share something about you"
      // imageUrl: ""
    };

    this.card = {
      cardTitle: "Card title",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardImage: "Card Image"
    };
  }

  componentDidUpdate(prevProps) {
    console.log("prevProps", prevProps);
    if (this.props.userInSession !== prevProps.userInSession) {
      this.setState({
        firstName: this.props.userInSession.firstname,
        lastName: this.props.userInSession.lastname
        // imageUrl: this.props.userInSession.imageUrl
      });
    } else {
      return <h1>Loading...</h1>;
    }
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
          <Row className="mt-3">
            {/* render this button if user is logged in user */}
            <Link to="/profile/edit" className="mt-3">
              Edit your profile
            </Link>
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
                    {this.state.firstName} {this.state.lastName}
                  </h2>
                  <h4 className="text-secondary my-2">
                    {this.state.occupation}
                  </h4>
                  <p className="text-secondary mt-3">
                    {this.state.description}
                  </p>
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
