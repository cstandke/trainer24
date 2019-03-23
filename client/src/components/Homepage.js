import React, { Component } from "react";
import { Jumbotron, Button, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import CourseCard from "./protected/courses/CourseCard";
import axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArray:[]
    }
  }

  getCourses() {
    let service = axios.create({
      baseURL: "http://localhost:5000/api",
      withCredentials: true
    });

    return service
      .get("/courses")
      .then(courses => {
        console.log(courses.data.results);
        // return courses.data.results;
        const newCardArray = courses.data.results.map(el => {
          // let card = new Card(el.published_title, el.title, el.image_125_H);
          // return <CourseCard card={card} />;
          return <CourseCard cardTitle={el.published_title} cardText={el.title} cardImage={el.image_125_H}/>
        });
        this.setState({cardArray:newCardArray});
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  cardSpace() {
    console.log(this.state.cardArray)
    return (
      <Row>
        {this.state.cardArray}
      </Row>
    );
  }

  componentDidMount() {
    this.getCourses();
  }

  render() {
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
          {this.cardSpace()}
        </Container>
      </div>
    );
  }
}

export default HomePage;
