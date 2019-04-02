import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./AuthService";
import { Alert } from "reactstrap";
import {
  Container,
  Row,
  Card,
  CardBody,
  CardText,
  CardImg,
  Col
} from "reactstrap";
// import Logo from "../images/logo.png";
import mobile_1 from "../images/mobile_1.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      username: "",
      password: "",
      email: "",
      errorMessage: "",
      redirect: false
    };
    this.service = new AuthService();
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dashboard" />;
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { username, password, firstname, lastname, email } = this.state;
    this.service
      .signup(username, password, firstname, lastname, email)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          firstname: "",
          lastname: "",
          email: ""
        });
        this.props.setUser(response);
        this.setRedirect();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({ errorMessage: error.response.data.message });
        console.log(error);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Container>
          <Row className="mt-3 text-center">
            <Col>
              <Card className="shadow flex-row">
                <div>
                  <CardImg
                    className="bg-secondary text-light d-none d-lg-block"
                    style={{ width: "500px" }}
                    src={mobile_1}
                    alt="Image"
                  />
                </div>
                <CardBody style={{ minWidth: "400px" }}>
                  <CardText>
                    <h2>Create your account</h2>
                    <form
                      className="form-signin"
                      onSubmit={this.handleFormSubmit}
                    >
                      <img class="mb-4" src="" alt="" width="72" height="72" />
                      <div className="form-group">
                        <label>First name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstname"
                          value={this.state.firstname}
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last name:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          value={this.state.lastname}
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={this.state.email}
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={this.state.password}
                          onChange={e => this.handleChange(e)}
                        />
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </form>
                    <hr />
                    {this.state.errorMessage && (
                      <Alert color="warning">{this.state.errorMessage}</Alert>
                    )}
                    <p>
                      Already have account? <br />
                      <Link to={"/login"}>Login</Link>
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Signup;
