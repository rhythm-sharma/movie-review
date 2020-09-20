import React, { Component } from "react";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "../../../axios";
import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import { logoutUser } from "../../../utils/authentication/authentication";
import logo from "../../../assets/images/SVG/logo.svg";
import "./Nav.css";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      showDropDown: false,
      profileUrl: secureStorage.getItem(sessionStorage.currentUser).profileURL,
      name: secureStorage.getItem(sessionStorage.currentUser).name,
      searchVal: "",
    };
  }

  handleOpenDropDown = () => {
    this.setState(
      {
        showDropDown: true,
      },
      () => {
        document.addEventListener("click", this.handleCloseDropDown);
      }
    );
  };

  handleCloseDropDown = () => {
    this.setState(
      {
        showDropDown: false,
      },
      () => {
        document.removeEventListener("click", this.handleCloseDropDown);
      }
    );
  };

  handleSearchVal = (e) => {
    const { searchVal } = this.state;
    let tempSearchVal = searchVal;

    tempSearchVal = e.target.value;

    this.setState({
      searchVal: tempSearchVal,
    });
  };

  handleMovieSearch = async () => {
    const { searchVal } = this.state;

    try {
      const data = await axios.get(
        `search/movie?api_key=04109009dab22c4ad6a56c7b523fa4b9&language=en-US&query=${searchVal}&page=1&include_adult=false`
      );
      console.log("data: ", data);
      this.props.handleSearchedMovies(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { showDropDown, profileUrl, name } = this.state;
    return (
      <div className="navigation-container">
        <Navbar className="w-100" bg="dark" variant="dark">
          <Navbar.Brand className="text-white brand">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span className="ml-3 brand-title"> Movie Review </span>
          </Navbar.Brand>

          <Nav className="mr-auto">
            <Link to="/movies" className="mr-3 nav-link">
              Movies
            </Link>

            <Link to="/bookmark" className="mr-3 nav-link">
              Bookmark
            </Link>
          </Nav>

          {this.props.showSearhBar && (
            <Form
              inline
              className="mr-5"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-bar"
                onChange={this.handleSearchVal}
              />
              <Button
                type="submit"
                variant="outline-info"
                onClick={this.handleMovieSearch}
              >
                Search
              </Button>
            </Form>
          )}

          <a
            className="nav-link dropdown-toggle"
            role="button"
            onClick={this.handleOpenDropDown}
          >
            <img
              src={profileUrl}
              width="40"
              height="40"
              className="rounded-circle profile-image"
            />
          </a>
          <div
            className={`dropdown-menu ${showDropDown ? "show" : ""}`}
            aria-labelledby="navbarDropdownMenuLink"
          >
            <a className="dropdown-item text-truncate">Hi! {name}</a>
            <a className="dropdown-item text-truncate" onClick={logoutUser}>
              Log Out
            </a>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
