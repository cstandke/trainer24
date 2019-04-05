import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./AuthService.js";
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
import Herosm from "../images/hero_small.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      redirect: false,
      errorMessage: ""
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

    const { username, password } = this.state;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
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
                    src={Herosm}
                    alt="Image"
                  />
                </div>
                <CardBody style={{ minWidth: "400px" }}>
                  <CardText>
                    <h2>Login</h2>

                    <form
                      className="form-signin"
                      onSubmit={this.handleFormSubmit}
                    >
                      <div class="form-group">
                        <label>Username:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.username}
                          //or: this.state.email!
                          onChange={e => this.handleChange(e)}
                        />
                      </div>

                      <div class="form-group">
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
                        class="btn btn-lg btn-primary btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                    <hr />
                    {this.state.errorMessage && (
                      <Alert color="warning">{this.state.errorMessage}</Alert>
                    )}
                    <p>
                      You don't have account yet? <br />
                      <Link to={"/signup"}>Signup</Link>
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
export default Login;
