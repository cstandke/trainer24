import React, { Component } from "react";
import { Container, Row, Button } from "reactstrap";
import CourseCard from "../CourseCard";
import { Link } from "react-router-dom";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userInSession.firstname,
      myOffersArray: [],
      myCoursesArray: []
    };

    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
      withCredentials: true
    });
  }

  getMyOffers() {
    return this.service
      .get(`/offers?ownerId=${this.props.userInSession._id}`)
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
        this.setState({ myOffersArray: newCardArray });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  getMyCourses() {
    return this.service
      .get("/offers/myCourses")
      .then(courses => {
        console.log(courses.data);
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
        this.setState({ myCoursesArray: newCardArray });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  myOffersSpace() {
    // console.log(this.state.cardArray);
    return <Row>{this.state.myOffersArray}</Row>;
  }

  myCoursesSpace() {
    // console.log(this.state.cardArray);
    return <Row>{this.state.myCoursesArray}</Row>;
  }

  componentDidMount() {
    this.getMyOffers();
    this.getMyCourses();
  }

  render() {
    return (
      <div>
        {/* <Nav id="#sidebar">Sidebar</Nav> */}
        <Container id="heading" className="text-center mt-4">
          <h1>Welcome {this.state.firstName}</h1>
        </Container>
        <Container id="content" className="mt-3">
          <h2> My Offers</h2>
          {this.myOffersSpace()}

          <Button tag={Link} to="/createoffer" className="mt-3">
            Add course
          </Button>
          <hr className="mt-5 mb-5" />

          <h2> My joined Courses</h2>
          {this.myCoursesSpace()}
        </Container>
      </div>
    );
  }
}
export default Dashboard;
