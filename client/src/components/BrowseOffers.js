import React, { Component } from "react";
import { Jumbotron, Button, Container, Row, Col, FormGroup, Form, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import axios from "axios";
// import Hero from "../images/hero.png";

class BrowseOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArray: [],
      searchTerm: ""
    };
  }

  getCourses() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
      withCredentials: true
    });

    return service
      .get("/offers")
      .then(courses => {
        // console.log(courses.data);
        // return courses.data.results;
        const newCardArray = courses.data.filter(el => el.courseTitle.toUpperCase().includes(this.state.searchTerm.toUpperCase()))
          .map((el, idx) => {
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
    console.log(this.state.cardArray);
    if (this.state.cardArray.length === 0) return (
      <Container className="text-center mb-4">
      <h5>No results, please try again!</h5>
      </Container>
    )
    else return <Row>{this.state.cardArray}</Row>;
  }

  componentDidMount() {
    this.getCourses();
  }

  handleSearchEvent(e) {
    this.setState({searchTerm:e.target.value});
    // console.log("search term:",this.state.searchTerm)
    this.getCourses();
  }

  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            {/* <Label for="searchbar" sm={2}>Search Courses</Label> */}
            <Col sm={9} xs={9} className="mx-auto my-4 p-2">
            <Input name="searchbar" placeholder="Search our Courses..." onChange={e=>this.handleSearchEvent(e)}></Input>
            </Col>
          </FormGroup>
        </Form>

        <Container fluid={true} className="p-2">
          {/* <h2 className="display-5 ml-2 ml-4 mb-4">Check out our classes:</h2> */}
          {this.cardSpace()}
        </Container>
      </div>
    );
  }
}

export default BrowseOffers;
