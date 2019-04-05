import React, { Component } from "react";
import OfferService from "./OfferService";
import defaultImage from "../../images/course.png";
import htmlToText from "html-to-text"

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container
} from "reactstrap";

class CreateCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offername: "",
      offertype: "",
      offerdescription: "",
      location: "",
      imageUrl: undefined,
      fileUrl: undefined,
      udemyId:"",
      udemyUrl:"",
      udemyTitle:"",
    };
    this.service = new OfferService();
    this.timeout = null;
    console.log(this.props);
    console.log(this.state);
  }

  handleFormSubmit = event => {
    event.preventDefault();

    const {
      offername,
      offertype,
      offerdescription,
      location,
      imageUrl,
      fileUrl,
      udemyId,
      udemyUrl,
      udemyTitle
    } = this.state;
    const loggedInUser = this.props.userInSession;
    this.service
      .createoffer(
        offername,
        offertype,
        offerdescription,
        location,
        imageUrl,
        fileUrl,
        udemyId,
        udemyUrl,
        udemyTitle,
        loggedInUser
      )
      .then(response => {
        this.setState({
          offername: "",
          offertype: "",
          offerdescription: "",
          location: "",
          imageUrl: undefined,
          fileUrl: undefined,
          udemyId:"",
          udemyUrl:"",
          udemyTitle:""
        });
        document.getElementById("courseForm").reset();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ errorMessage: error.response.data.message });
        console.log(error);
      });
  };

  handleImageUpload = e => {
    console.log("The image to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.service
      .handleUpload(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
        console.log(this.state);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    this.service
      .handleUpload(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ fileUrl: response.secure_url });
        console.log(this.state);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  importUdemyData = e => {
    let { name, value } = e.target;
    let delay = 1500
    clearTimeout(this.timeout)
    this.setState({ [name]: value })
    this.timeout = setTimeout(() => {
      // console.log("State change!");
      this.service.getUdemyData(this.state.udemyUrl)
      .then(response => {
        if (response.message) return 
        console.log(response.data)
        this.setState({udemyId:response.data.id})
        this.setState({udemyTitle:response.data.title})
        if (this.state.offername==="") this.setState({offername:response.data.title})
        if (this.state.offerdescription==="") this.setState({
          offerdescription:htmlToText.fromString(response.data.description)
        })
        this.setState({imageUrl:response.data.image_480x270})
        this.setState({udemyUrl:response.data.url})
      })
    },delay);
  }

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    let imageUrl = this.state.imageUrl || defaultImage;
    let imageStyle = {
      maxHeight: "25vh"
    };
    return (
      <div>
        <Form id="courseForm" onSubmit={this.handleFormSubmit}>
          <Container className="my-5 text-center">
            <h2 className="text-center">Create a new offer</h2>
            <img
              className="mt-4"
              src={imageUrl}
              alt={imageUrl}
              style={imageStyle}
            />
          </Container>
          <Container>
            <FormGroup row>
              <Label for="imageFile" sm={2}>
                Upload Image
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleImageUpload}
                  type="file"
                  name="file"
                  id="imageFile"
                />
              </Col>
            </FormGroup>
            <p>
              your selection > here add component to search courses from udemy
              that you want to create an offer for
            </p>
            <FormGroup row>
              <Label for="udemyUrl" sm={2}>
               Udemy course url:
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.importUdemyData}
                  value={this.state.udemyUrl}
                  type="text"
                  name="udemyUrl"
                  id="udemyUrl"
                  placeholder="e.g. /complete-python-bootcamp/"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="offerName" sm={2}>
                Title of your offer
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleChange}
                  value={this.state.offername}
                  type="text"
                  name="offername"
                  id="offerName"
                  placeholder="Title of your offer"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="offerType" sm={2}>
                Type of offer
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleChange}
                  type="select"
                  name="offertype"
                  id="offerType"
                  value={this.state.offertype}
                >
                  {" "}
                  <option>Please select</option> />
                  <option value="Private Lesson">Private lesson</option> />
                  <option value="Study Group">Study group</option>
                </Input>
              </Col>
            </FormGroup>
           {/*  <FormGroup>
              <Label for="exampleSelect">Select</Label>
            </FormGroup> */}

            <FormGroup row>
              <Label for="offerDescription" sm={2}>
                Your offer in a nutshell
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleChange}
                  value={this.state.offerdescription}
                  type="textarea"
                  name="offerdescription"
                  id="offerDescription"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="location" sm={2}>
                Time and place:
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleChange}
                  value={this.state.location}
                  type="text"
                  name="location"
                  id="location"
                  placeholder="When and where?"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                File
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.handleFileUpload}
                  type="file"
                  name="fileUrl"
                  id="exampleFile"
                />
                <FormText color="muted">
                  Add your course material here...
                </FormText>
              </Col>
            </FormGroup>
            
            {/* <FormGroup row>
            <Label for="checkbox2" sm={2}>
              Checkbox
            </Label>
            <Col sm={{ size: 10 }}>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" id="checkbox2" /> Check me out
                </Label>
              </FormGroup>
            </Col>
          </FormGroup> */}
            <FormGroup check row className="mb-5">
              <Col className="text-center">
                <Button type="submit" outline color="primary">
                  Publish your offer
                </Button>
              </Col>
            </FormGroup>
          </Container>
        </Form>
      </div>
    );
  }
}

export default CreateCourse;
