import React, { Component } from "react";
import { Link } from "react-router-dom";
import OfferService from "./protected/courses/OfferService";
import defaultImage from "./images/course.png";

import {
  Button,
  Container,
  Row,
  Card,
  CardImg,
  CardBody,
  CardText
} from "reactstrap";

class OfferDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theOffer: {}
    };
    this.service = new OfferService();
    // console.log(this.props);
    console.log("userInSession",this.props.userInSession)

    // console.log(this.state);
    this.joinCourse = this.joinCourse.bind(this);
    this.leaveCourse = this.leaveCourse.bind(this);

  }

  getOfferDetails(offerID) {
    this.service
      .getOfferDetail(offerID)
      .then(foundOffer => {
        // console.log("Offer Result",theOffer)
        this.setState({ theOffer: foundOffer });
      })
      .catch(err => console.log(err));
  }

  joinCourse() {
    this.service.joinCourse(this.state.offerId).then(response => {
      if (response.status === 200) {
        console.log("joined this course!");
        this.getOfferDetails(this.state.offerId);
        // console.log(response.data);
      } else console.log("not successful!");
    });
  }

  leaveCourse() {
    this.service.leaveCourse(this.state.offerId).then(response => {
      if (response.status === 200) {
        console.log("left this course!");
        this.getOfferDetails(this.state.offerId);
        // console.log(response.data);
      } else console.log("not successful!");
    });
  }

  joinButton() {
    if (this.state.theOffer.isJoined)
      return (
        <Button color="primary" outline className="w-50 mt-3" onClick={() => this.leaveCourse()}>
          You joined this Course - Click to leave
        </Button>
      );
    // else if (!this.props.userInSession) return <Button primary disabled className="w-50 mt-3">Login to join this Course</Button>
    else
      return (
        <Button color="primary" className="w-50 mt-3" onClick={() => this.joinCourse()}>
          Join this Course
        </Button>
      );
  }

  courseMaterials() {
    if (this.state.theOffer.isJoined)
      return (
        <div>
          <h5 className="mt-4">Course materials:</h5>
          <a href={this.state.theOffer.courseFile}>Download Course materials</a>
        </div>
      );
    else
      return (
        <div>
          <h5 className="mt-4">Course materials:</h5>
          <p>Join this course to see course materials</p>
        </div>
      );
  }

  componentDidMount() {
    // console.log("props",this.props)
    const { params } = this.props.match;
    this.setState({ offerId: params.id });
    // console.log("params:",params)
    this.getOfferDetails(params.id);
    console.log("userInSession",this.props.userInSession)
  }

  render() {
    // console.log(this.state);
    let cardImage = this.state.theOffer.courseImage || defaultImage;
    return (
      <div>
        <Container>
          <Row className="mt-3">
            <Card mb="4" className="shadow w-100">
              <CardImg
                className="bg-secondary text-light mx-auto m-4"
                src={cardImage}
                alt={cardImage}
                style={{
                  maxHeight: "25vh",
                  maxWidth: "75vh",
                  width: "auto",
                  height: "auto"
                }}
              />
              <CardBody>
                <CardText tag="div">
                  <h2 className="text-primary mt-4">
                    {this.state.theOffer.courseTitle}
                  </h2>
                  <h5 className="my-3">{this.state.theOffer.courseType}</h5>
                  <h5>
                    Udemy Course:{" "}
                    <a
                      href={`https://www.udemy.com${
                        this.state.theOffer.udemyUrl
                      }`}
                    >{`https://www.udemy.com${
                      this.state.theOffer.udemyUrl
                    }`}</a>
                  </h5>
                  <h5>
                    Trainer:{" "}
                    {this.state.theOffer.ownerProfileLink && (
                      <span>
                        <Link to={this.state.theOffer.ownerProfileLink}>
                          {this.state.theOffer.courseOwner}
                        </Link>
                        <span> </span>
                        {this.state.theOffer.isJoined && (
                        <a href={`mailto://${this.state.theOffer.ownerEmail}`}>
                          {`<${this.state.theOffer.ownerEmail}>`}
                        </a>
                        )}
                      </span>
                    )}
                  </h5>
                  <h5 className="mt-4">Description:</h5>
                  <div className="mt-2 plaintext">
                    {this.state.theOffer.courseDetails}
                  </div>
                  <h5 className="mt-4">Time and place:</h5>
                  <p className="mt-2">{this.state.theOffer.courseLocation}</p>
                  {this.courseMaterials()}
                </CardText>
                <div className="text-center">{this.joinButton()}</div>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default OfferDetail;
