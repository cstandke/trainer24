import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  CardImg,
  CardBody,
  CardText /*  */,
  FormGroup,
  FormText,
  Label,
  Input,
  Button
} from "reactstrap";
import contentEditable from "./contentEditable";
import UpdateProfileService from "./UpdateProfileService";
//to use history without using route
import { withRouter } from "react-router";
// import { Link } from "react-router-dom"; // import axios from "axios";
import defaultImage from "./images/user_man.png";

class ProfilePageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userInSession.firstname || "Hendik",
      lastName: this.props.userInSession.lastname || "W.",
      occupation: this.props.userInSession.occupation || "Teacher, lifelong learner, JS Wizard, Giraffe tamer",
      description: this.props.userInSession.description || "What else do we need to know about you?",
      imageUrl: this.props.userInSession.imageUrl
    };
    this.service = new UpdateProfileService();
    // this.defaultImage = "./images/user_man.png"
    console.log("CONSTRUCTOR", this.props.userInSession);
  }

  submitChanges = () => {
    //event.preventDefault();
    console.log("submitState",this.state)
    const {
      firstName,
      lastName,
      occupation,
      description,
      imageUrl
    } = this.state;
    this.service
      .editProfile(firstName, lastName, occupation, description, imageUrl)
      .then(response => {
        //console.log("INSIDE PROMISE", response);
        //redirect here
        // this.context.router.push("/dashboard");
        this.props.history.push("/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

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
        // console.log("INSIDE FILE UPLOAD", this.state);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this is storing the text changes to the state
  storeNewValue = (value, name) => {
    console.log("VALUE FROM DOM", name, ":", value);
    this.setState({ [name]: value });
    setTimeout(() => console.log("State stored:", this.state),500)
  };

  render() {
    // console.log("state at render", this.state);
    // console.log("AT RENDER ", this.state.loggedInUser);
    let FirstName = contentEditable("h2");
    let LastName = contentEditable("h2");
    let Occupation = contentEditable("h4");
    let Description = contentEditable("p");
    let profileImage = this.state.imageUrl || defaultImage;
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
        <Container id="heading" className="text-center text-primary -mt-4">
          <h1>My Profile</h1>
        </Container>
        <Container>
          <Row className="mt-3">
            <Card mb="4" className="shadow d-flex flex-md-row">
            <Container style={cardImageWrapperStyle}>
              <CardImg style={cardImageStyle}
                className="bg-secondary text-light"
                src={profileImage}
                alt="user image"
                // style={{height:"25vh"}}
              />
              </Container>
              <CardBody>
                <CardText tag="div">
                  <FirstName
                    name="firstName"
                    className="text-primary mt-2"
                    value={this.state.firstName}
                    // onNewValue={this.storeNewValue}
                    onChange={this.storeNewValue}
                  />
                  <LastName
                    name="lastName"
                    className="text-primary mt-2"
                    value={this.state.lastName}
                    // onNewValue={this.storeNewValue}
                    onChange={this.storeNewValue}

                  />
                  <Occupation
                    name="occupation"
                    className="text-secondary my-3"
                    placeholder="Tutor, Lifelong Learner, Wizard"
                    value={this.state.occupation}
                    // onNewValue={this.storeNewValue}
                    onChange={this.storeNewValue}

                  />
                  <Description
                    name="description"
                    className="text-secondary my-3"
                    placeholder="What else do we need to know about you?"
                    value={this.state.description}
                    // onNewValue={this.storeNewValue}
                    onChange={this.storeNewValue}

                  />
                  <FormGroup row className="mx-1 my-5">
                    <Input
                      className="text-secondary"
                      // onChange={this.handleFileUpload}
                      type="file"
                      name="file"
                      id="File"
                    />
                    <FormText color="muted">
                      Please choose an image no bigger than 5 mb
                    </FormText>
                  </FormGroup>
                </CardText>
              </CardBody>
            </Card>
          </Row>
          <div className="text-center">
            <Button
              primary
              outline
              onClick={this.submitChanges}
              // call a function that sends this.state in the this.service
              className="my-2"
            >
              Submit changes
            </Button>
          </div>
        </Container>
      </div>
    );
  }
}
export default withRouter(ProfilePageEdit);
