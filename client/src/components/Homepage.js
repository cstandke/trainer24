import React, { Component } from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import axios from "axios";
// import Hero from "../images/hero.png";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArray: []
    };
  }

  getCourses() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });

    return service
      .get("/offers")
      .then(courses => {
        // console.log(courses.data);
        // return courses.data.results;
        const newCardArray = courses.data.map((el, idx) => {
          // let card = new Card(el.published_title, el.title, el.image_125_H);
          // return <CourseCard card={card} />;
          return (
            <CourseCard
              key={idx}
              cardTitle={el.courseTitle}
              cardText={el.courseDetails}
              cardImage={el.courseImage}
              cardLink={el.courseLink}
            />
          );
        });
        this.setState({ cardArray: newCardArray });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  cardSpace() {
    // console.log(this.state.cardArray);
    return <Row>{this.state.cardArray}</Row>;
  }

  componentDidMount() {
    this.getCourses();
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <div className="imageHolder" />
          <h1 className="display-4">trainit</h1>
          <p className="lead">Unlock your potential.</p>
          {/* <hr className="my-4" /> */}
          <p>
            1:1 tutoring and study groups that enhance your learning
            experiences.
          </p>
          <Button color="primary" size="lg" tag={Link} to="/signup">
            Learn more
          </Button>
        </Jumbotron>
        <div className="mobileHero" />

        <Container fluid={true} className="p-2">
          <h2 className="display-5 my-2 mb-4">Check out our classes:</h2>
          {this.cardSpace()}
        </Container>
        <Container fluid={true} className="text-center mt-6 mb-4">
          <Col className="text-muted" size="sm">
            trainit © 2019 • "Humaaans" by Pablo Standley is licensed under CC
            BY 4.0
          </Col>
        </Container>
      </div>
    );
  }
}

export default HomePage;
