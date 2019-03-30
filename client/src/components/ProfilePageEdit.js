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
// import { Link } from "react-router-dom"; // import axios from "axios";

class ProfilePageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      occupation: "Trainer, Lifelong Learner, Wizzard",
      description: "Share something about you",
      imageUrl: ""
    };

    this.service = new UpdateProfileService();
  }

  //do not update for all props, only for user in session (componentWillReceiveProps will render on any state change)

  componentDidUpdate(prevProps) {
    if (this.props.userInSession !== prevProps.userInSession) {
      this.setState({
        firstName: this.props.userInSession.firstname,
        lastName: this.props.userInSession.lastname,
        imageUrl: this.props.userInSession.imageUrl
      });
    }
  }

  submitChanges = () => {
    //event.preventDefault();
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
        console.log("INSIDE PROMISE", response);
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
        console.log("INSIDE FILE UPLOAD", this.state);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this is storing the text changes to the state
  storeNewValue = (value, name) => {
    console.log("VALUE FROM DOM", name, ":", value);
    this.setState({ [name]: value });
  };

  render() {
    console.log("props at render", this.props);
    console.log("state at render", this.state);
    console.log("AT RENDER ", this.state.loggedInUser);
    let FirstName = contentEditable("h2");
    let LastName = contentEditable("h2");
    let Occupation = contentEditable("h4");
    let Description = contentEditable("p");

    return (
      <div>
        <Container id="heading" className="text-center text-primary -mt-4">
          <h1>My Profile</h1>
        </Container>
        <Container>
          <Row className="mt-3">
            <Card mb="4" className="shadow d-flex flex-md-row">
              <CardImg
                className="bg-secondary text-light"
                src="https://mobirise.com/extensions/realtym4/assets/images/face4.jpg"
                alt="https://mobirise.com/extensions/realtym4/assets/images/face4.jpg"
                // style={{height:"25vh"}}
              />
              <CardBody>
                {/* <CardTitle tag="h5">{props.card.cardTitle}</CardTitle> */}
                <CardText tag="div">
                  <FirstName
                    name="firstName"
                    className="text-primary mt-2"
                    value={this.state.firstName}
                    newValue={this.storeNewValue}
                  />
                  {/* <h2 className="text-primary mt-2">{this.firstName}</h2> */}
                  <LastName
                    name="lastName"
                    className="text-primary mt-2"
                    value={this.state.lastName}
                    newValue={this.storeNewValue}
                  />
                  {/* <h2 className="text-primary mt-2">{this.lastName}</h2> */}
                  <Occupation
                    name="occupation"
                    className="text-secondary my-2"
                    value={this.state.occupation}
                    newValue={this.storeNewValue}
                  />
                  {/* <h4 className="text-secondary my-2">
                    {this.occupation}
                  </h4> */}
                  <Description
                    name="description"
                    className="text-secondary mt-3"
                    value={this.state.description}
                    newValue={this.storeNewValue}
                  />
                  {/* <p className="text-secondary mt-3">{this.description}</p> */}
                  <br />
                  <FormGroup row>
                    <Label className="text-primary mt-3" for="File">
                      Show us your pretty face
                    </Label>
                    <Input
                      className="text-secondary"
                      onChange={this.handleFileUpload}
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
            {/*<Col className="text-center"> */}
          </Row>
          <div className="text-center">
            <Button
              onClick={this.submitChanges}
              // call a function that sends this.state in the this.service
              className="text-primary my-2"
            >
              Submit changes
            </Button>
          </div>
        </Container>
        {/* <Container id="content" className="mt-3">
          <h2> My Offers</h2>
          {this.cardSpace()}
          <hr className="mt-5 mb-5" />
          <h2> Courses history</h2>
          {this.cardSpace()}
        </Container> */}
      </div>
    );
  }
}
export default ProfilePageEdit;