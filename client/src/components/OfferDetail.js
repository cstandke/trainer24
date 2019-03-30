import React, { Component } from "react";
import { Link } from "react-router-dom";
import OfferService from "./protected/courses/OfferService";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
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
  }

  getOfferDetails(offerID) {
    this.service
      .getOfferDetail(offerID)
      .then(theOffer => {
        // console.log("Offer Result",theOffer)
        this.setState({ theOffer: theOffer });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { params } = this.props.match;
    // console.log("params:",params)
    this.getOfferDetails(params.id);
  }

  render() {
    console.log(this.state)

    return (
      <div>
      
       <Container>
       <Row className="mt-3">
         <Card mb="4" className="shadow w-100">
           {/* <img src="..." className="card-img-top" alt="Image goes here" /> */}
           <CardImg
             className="bg-secondary text-light mx-auto my-1"
             src={this.state.theOffer.courseImage}
             alt={this.state.theOffer.courseImage}
             style={{height:"25vh", maxWidth:"50vh"}}
           />
           <CardBody   >
             {/* <CardTitle tag="h5">{props.card.cardTitle}</CardTitle> */}
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
              <Button primary className="w-25 mt-3">Join this Course</Button>
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
