import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/SVG/logo.svg";
import { loginUser } from "../../utils/authentication/authentication";
import { secureStorage, User } from "../../utils/clientStorage/clientStorage";
import "./SignUp.css";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      signUpCredentials: [
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
      usernameExistsError: "",
    };
  }

  componentDidMount() {
    const userNames = localStorage.getItem("userName");
    if (!userNames) {
      localStorage.setItem("userName", JSON.stringify([]));
    }
  }

  getRandomNumber = (digit) => {
    return Math.random().toFixed(digit).split(".")[1];
  };

  resetAnimation = (index) => {
    const { signUpCredentials } = this.state;
    let tempSignUpCredentials = signUpCredentials;
    tempSignUpCredentials[index].error = "";
    this.setState({ signUpCredentials: tempSignUpCredentials });
  };

  handleEmailChange = (e) => {
    const { signUpCredentials } = this.state;
    let tempSignUpCredentials = signUpCredentials;
    tempSignUpCredentials[0].value = e.target.value;
    this.setState({ signUpCredentials: tempSignUpCredentials });
    // reset animation
    if (
      tempSignUpCredentials[0].value !== "" ||
      tempSignUpCredentials[0].value !== null
    ) {
      this.resetAnimation(0);
    }
  };

  handleUserNameChange = (e) => {
    const { signUpCredentials } = this.state;
    let tempSignUpCredentials = signUpCredentials;
    tempSignUpCredentials[1].value = e.target.value;
    this.setState({ signUpCredentials: tempSignUpCredentials });
    // reset animation
    if (
      tempSignUpCredentials[1].value !== "" ||
      tempSignUpCredentials[1].value !== null
    ) {
      this.resetAnimation(1);
      this.setState({ usernameExistsError: "" });
    }
  };

  handlePasswordChange = (e) => {
    const { signUpCredentials } = this.state;
    let tempSignUpCredentials = signUpCredentials;
    tempSignUpCredentials[2].value = e.target.value;
    this.setState({ signUpCredentials: tempSignUpCredentials });
    // reset animation
    if (
      tempSignUpCredentials[2].value !== "" ||
      tempSignUpCredentials[2].value !== null
    ) {
      this.resetAnimation(2);
    }
  };

  handleSubmit = () => {
    const { signUpCredentials } = this.state;
    let tempSignUpCredentials = signUpCredentials;
    let valid = true;

    // Validation
    tempSignUpCredentials.forEach((item) => {
      if (item.value === "" || item.value === null) {
        if (item.name === "name") {
          item.error = "Name is required";
          valid = false;
        } else if (item.name === "username") {
          item.error = "User Name is required and must be unique!";
          valid = false;
        } else if (item.name === "password") {
          item.error = "Password is required";
          valid = false;
        }
      } else {
        item.error = "";
      }
    });

    this.setState({ signUpCredentials: tempSignUpCredentials });

    if (valid) {
      if (this.isUserExist(signUpCredentials)) {
        this.setState({
          usernameExistsError:
            "Username already in use, Please try with another one!",
        });
      } else {
        let userName = JSON.parse(localStorage.getItem("userName"));
        if (!userName || userName.length === 0) {
          localStorage.setItem(
            "userName",
            JSON.stringify([signUpCredentials[1].value])
          );
        } else {
          userName.push(signUpCredentials[1].value);
          localStorage.setItem("userName", JSON.stringify(userName));
        }

        const newUser = new User(
          signUpCredentials[0].value,
          signUpCredentials[1].value,
          signUpCredentials[2].value
        );
        secureStorage.setItem(signUpCredentials[1].value, newUser);
        loginUser(signUpCredentials[1].value);
      }
    }
  };

  isUserExist = (signUpCredentials) => {
    if (
      signUpCredentials[1].value !== "" ||
      signUpCredentials[1].value !== null
    ) {
      const userName = signUpCredentials[1].value;
      const userNames = JSON.parse(localStorage.getItem("userName"));
      if (userNames === null || userNames === "") {
        return false;
      } else if (userNames.length > 0 && userNames.includes(userName)) {
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    const { signUpCredentials, usernameExistsError } = this.state;
    return (
      <div className="signup-container">
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
              Sign up
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
                      signUpCredentials[0].error !== "" ? "error" : ""
                    }`}
                    placeholder="Name"
                    type="text"
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="error-message">
                  {signUpCredentials[0].error}
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    name=""
                    className={`form-control ${
                      signUpCredentials[1].error !== "" ? "error" : ""
                    }`}
                    placeholder="Username"
                    type="text"
                    onChange={this.handleUserNameChange}
                  />
                </div>
                <div className="error-message">
                  {signUpCredentials[1].error}
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input
                    className={`form-control ${
                      signUpCredentials[1].error !== "" ? "error" : ""
                    }`}
                    placeholder="******"
                    type="password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="error-message">
                  {signUpCredentials[2].error}
                </div>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.handleSubmit}
                >
                  <b>Sign Up</b>
                </button>
                <div className="error-message text-center">
                  {usernameExistsError}
                </div>
              </div>
              <p className="text-center">
                <Link to="/login">Already registered? Log in</Link>
              </p>
            </form>
          </article>
        </div>
      </div>
    );
  }
}

export default SignUp;
