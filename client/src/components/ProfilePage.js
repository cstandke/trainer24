import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  CardImg,
  CardBody,
  CardText,
  Button
} from "reactstrap";
import CourseCard from "./CourseCard";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import UpdateProfileService from "./UpdateProfileService";
import axios from "axios";
import defaultImage from "./../components/images/user_man.png";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theUser: {}
    };

    // this.card = {
    //   cardTitle: "Card title",
    //   cardText:
    //     "Some quick example text to build on the card title and make up the bulk of the card's content.",
    //   cardImage: "Card Image"
    // };

    this.profileService = new UpdateProfileService();
    // this.defaultImage = "./images/user_man.png"
    this.offerService = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
      withCredentials: true
    });
  }

  componentDidMount() {
    // console.log("THE PROPS", this.props.match.params);
    const id = this.props.match.params.id || this.props.userInSession._id;
    this.getUserDetails(id);
    this.getMyOffers();
    this.getMyCourses();
  }

  getUserDetails(userId) {
    this.profileService
      .getUserDetails(userId)
      .then(foundUser => {
        console.log("User OBj", this.state.theUser);
        this.setState({ theUser: foundUser });
      })
      .catch(err => console.log(err));
    console.log("the user", this.state);
  }

  getMyOffers() {
    console.log("userId:", this.state.userId);
    return this.offerService

      .get(`/offers?ownerId=${this.props.match.params.id || this.props.userInSession._id}`)
      .then(courses => {
        console.log("course", courses);
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
    return this.offerService
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

  render() {
    console.log(this.props.userInSession._id, this.props.match.params.id);
    console.log(this.state.theUser);
    let profileImage = this.state.theUser.imageUrl || defaultImage;
    let cardImageStyle = {
      maxWidth:"100%",
      maxHeight:"100%",
      width:"auto",
      height:"auto"
    }

    let cardImageWrapperStyle = {
      minHeight: "200px",
      maxHeight:"400px",
      width:"400px",
      textAlign:"center"
    }
    return (
      <div>
        <Container id="heading" className="text-center mt-4">
          <h1>My Profile</h1>
        </Container>
        <Container>
          <Row className="mt-3">
            {/* render this button if user is logged in user */}

            {/* probably you need this line ======> 183 please investigate */}
            {this.props.userInSession._id ===
              (this.props.match.params.id || this.props.userInSession._id) && (
              <Link to="/profile/edit" className="mt-3 mx-4">
                <Button outline primary>Edit your profile</Button>
              </Link>
            )}

            <br />
            <Card mb="4" className="shadow d-flex flex-md-row w-100 m-3">
              {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
              <Container style={cardImageWrapperStyle}>
              <CardImg style={cardImageStyle}
                className="bg-secondary text-light"
                src={profileImage}
                alt="default user image"
                // style={{height:"25vh"}}
              />
              </Container>
              <CardBody>
                {/* <CardTitle tag="h5">{props.card.cardTitle}</CardTitle> */}
                <CardText tyg="div">
                  <h2 className="text-primary mt-2">
                    {this.state.theUser.firstName} {this.state.theUser.lastName}
                  </h2>
                  <h4 className="text-secondary my-2">
                    {this.state.theUser.occupation}
                  </h4>
                  <p className="text-secondary mt-3">
                    {this.state.theUser.description}
                  </p>
                </CardText>
              </CardBody>
            </Card>
          </Row>
        </Container>
        

        <Container id="content" className="mt-3">
          <h2> My Offers</h2>
          {this.myOffersSpace()}
          <hr className="mt-5 mb-5" />
          <h2> My joined Courses</h2>
          {this.myCoursesSpace()}
        </Container>
      </div>
    );
  }
}
export default withRouter(ProfilePage);
