import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../utils/authentication/authentication";
import { secureStorage } from "../../utils/clientStorage/clientStorage";
import logo from "../../assets/images/SVG/logo.svg";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginCredentials: [
        {
          name: "name",
          value: "",
          error: "",
        },
        {
          name: "username",
          value: "",
          error: "",
        },
        {
          name: "password",
          value: "",
          error: "",
        },
      ],
      userNotExistsError: "",
    };
  }

  resetAnimation = (index) => {
    const { loginCredentials } = this.state;
    let tempLoginCredentials = loginCredentials;
    tempLoginCredentials[index].error = "";
    this.setState({ loginCredentials: tempLoginCredentials });
  };

  handleEmailChange = (e) => {
    const { loginCredentials } = this.state;
    let tempLoginCredentials = loginCredentials;
    tempLoginCredentials[0].value = e.target.value;
    this.setState({ loginCredentials: tempLoginCredentials });
    // reset animation
    if (
      tempLoginCredentials[0].value !== "" ||
      tempLoginCredentials[0].value !== null
    ) {
      this.resetAnimation(0);
    }
  };

  handleUserNameChange = (e) => {
    const { loginCredentials } = this.state;
    let tempLoginCredentials = loginCredentials;
    tempLoginCredentials[1].value = e.target.value;
    this.setState({ loginCredentials: tempLoginCredentials });
    // reset animation
    if (
      tempLoginCredentials[1].value !== "" ||
      tempLoginCredentials[1].value !== null
    ) {
      this.resetAnimation(1);
      this.setState({ userNotExistsError: "" });
    }
  };

  handlePasswordChange = (e) => {
    const { loginCredentials } = this.state;
    let tempLoginCredentials = loginCredentials;
    tempLoginCredentials[2].value = e.target.value;
    this.setState({ loginCredentials: tempLoginCredentials });
    // reset animation
    if (
      tempLoginCredentials[2].value !== "" ||
      tempLoginCredentials[2].value !== null
    ) {
      this.resetAnimation(2);
    }
  };

  handleSubmit = () => {
    const { loginCredentials } = this.state;
    let tempLoginCredentials = loginCredentials;
    let valid = true;

    // Validation
    tempLoginCredentials.forEach((item) => {
      if (item.value === "" || item.value === null) {
        if (item.name === "name") {
          item.error = "Name is required";
          valid = false;
        } else if (item.name === "username") {
          item.error = "Username is required";
          valid = false;
        } else if (item.name === "password") {
          item.error = "Password is required";
          valid = false;
        }
      } else {
        item.error = "";
      }
    });

    this.setState({ loginCredentials: tempLoginCredentials });

    // Check for Login credential in Local Storage
    // const currentUser = sessionStorage.currentUser;

    if (valid) {
      const userName = loginCredentials[1].value;
      if (userName) {
        const currentUserObj = secureStorage.getItem(userName);
        if (currentUserObj && currentUserObj.name === userName) {
          loginUser(userName);
        } else {
          this.setState({
            userNotExistsError:
              "User not found, Please try with another credentials!",
          });
        }
      } else {
      }
    }
  };

  render() {
    const { loginCredentials, userNotExistsError } = this.state;
    return (
      <div className="login-container">
        <div className="title pt-5">
          <img className="main-logo" src={logo} alt="" />
          <h1 className="text-white quicksand ml-3">Movie Review</h1>
        </div>
        <p className="text-center mb-0 mt-3 text-white avenir-light">
          Registering to this website, you accept our Terms of Use and our
          Privacy Policy
        </p>
        <div className="card avenir-light">
          <article className="card-body">
            <h2 className="card-title text-center mb-4 mt-1 quicksand">
              Log in
            </h2>
            <hr />
            <form
              className="form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="form-group">
                <div className="input-group">
                  <input
                    name=""
                    className={`form-control ${
                      loginCredentials[0].error !== "" ? "error" : ""
                    }`}
                    placeholder="Name"
                    type="text"
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="error-message">{loginCredentials[0].error}</div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    name=""
                    className={`form-control ${
                      loginCredentials[1].error !== "" ? "error" : ""
                    }`}
                    placeholder="Username"
                    type="text"
                    onChange={this.handleUserNameChange}
                  />
                </div>
                <div className="error-message">{loginCredentials[1].error}</div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    className={`form-control ${
                      loginCredentials[2].error !== "" ? "error" : ""
                    }`}
                    placeholder="******"
                    type="password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="error-message">{loginCredentials[2].error}</div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.handleSubmit}
                >
                  <b>Log in</b>
                </button>
                <div className="error-message text-center">
                  {userNotExistsError}
                </div>
              </div>
              <p className="text-center">
                <Link to="/signup">Not a member? Sign up</Link>
              </p>
            </form>
          </article>
        </div>
      </div>
    );
  }
}

export default Login;
