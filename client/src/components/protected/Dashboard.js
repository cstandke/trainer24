import React, { Component } from "react";
import { Container, Row, Button } from "reactstrap";
import CourseCard from "./courses/CourseCard";
import { Link } from "react-router-dom";
// import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.card = {
      cardTitle: "Card title",
      cardText:
        "Some quick example text to build on the card title and make up the bulk of the card's content.",
      cardImage: "Card Image"
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
          <h1>My Dashboard</h1>
        </Container>
        <Container id="content" className="mt-3">
          <h2> My Courses</h2>
          {this.cardSpace()}

          <Button tag={Link} to="/createoffer" className="mt-3">
            Add course
          </Button>
          <hr className="mt-5 mb-5" />

          <h2> Courses history</h2>
          {this.cardSpace()}
        </Container>
      </div>
    );
  }
}
export default Dashboard;
