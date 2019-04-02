import React, { Component } from "react";
import { Link } from "react-router-dom";
import OfferService from "./protected/courses/OfferService";
import defaultImage from "./images/course.png"


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
    // console.log(this.state);
    this.joinCourse = this.joinCourse.bind(this);
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
    this.service.joinCourse(this.state.offerId)
    .then(response => {
      if (response.status===200) {
        console.log("joined this course!");
        this.getOfferDetails(this.state.offerId);
        // console.log(response.data);
      }
      else console.log("not successful!")
    })
  }

  joinButton() {
    if (this.state.theOffer.isJoined) return (
      <Button primary disabled className="w-50 mt-3">You joined this Course</Button>
    ) 
    // else if (!this.props.userInSession) return <Button primary disabled className="w-50 mt-3">Login to join this Course</Button>
    else return (<Button primary className="w-50 mt-3" onClick={()=>this.joinCourse()}>Join this Course</Button>)
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.setState({offerId: params.id})
    // console.log("params:",params)
    this.getOfferDetails(params.id);
  }

  render() {
    // console.log(this.state)
    let cardImage = this.state.theOffer.courseImage || defaultImage;
    return (
      <div>
       <Container>
       <Row className="mt-3">
         <Card mb="4" className="shadow w-100">
           <CardImg
             className="bg-secondary text-light mx-auto my-1"
             src={cardImage}
             alt={cardImage}
             style={{height:"25vh", maxWidth:"50vh"}}
           />
           <CardBody   >
             <CardText>               
                <h2 className="text-primary my-4">
                  {this.state.theOffer.courseTitle}
               </h2>
               <h5 className="my-2">{this.state.theOffer.courseType}</h5>
              <h5>Trainer: {this.state.theOffer.ownerProfileLink &&(
                  <Link to={this.state.theOffer.ownerProfileLink}>
                    {this.state.theOffer.courseOwner}
                 </Link>
                 )}
               </h5>
               <h5 className="mt-4">Description:</h5>
               <p className="mt-2">{this.state.theOffer.courseDetails}</p>
               <h5 className="mt-4">Location:</h5>
               <p>{this.state.theOffer.location}</p>
             </CardText>
             <div className="text-center">
              {this.joinButton()}
             </div>
           </CardBody>
         </Card>
       </Row>
     </Container>
     </div>
    );
  }
}

export default OfferDetail;
