import React, { Component } from "react";
import axios from "../../axios";

import Nav from "../../components/Shared/Nav/Nav";
import MoviesCard from "../../components/Cards/MoviesCard/MoviesCard";
import { secureStorage } from "../../utils/clientStorage/clientStorage";

import "./Movies.css";

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      userObj: secureStorage.getItem(sessionStorage.currentUser),
      movies: [],
      searchedMovies: [],
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const { userObj } = this.state;
    let tempUserObj = userObj;
    let tempMovies = [];

    if (userObj.movies.length === 0) {
      try {
        const data = await axios.get(
          "/discover/movie?api_key=04109009dab22c4ad6a56c7b523fa4b9"
        );
        tempMovies = data.data.results;
        tempUserObj.movies = tempMovies;
        this.setState({
          userObj: tempUserObj,
        });
        secureStorage.setItem(userObj.username, userObj);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        userObj: secureStorage.getItem(sessionStorage.currentUser),
      });
    }
  };

  handleUserObj = (newUserObj) => {
    const { userObj } = this.state;
    this.setState({
      userObj: newUserObj,
    });

    secureStorage.setItem(userObj.username, newUserObj);
  };

  handleSearchedMovies = (newSearchedMovies) => {
    this.setState({
      searchedMovies: newSearchedMovies,
    });
  };

  render() {
    const { item, userObj, searchedMovies } = this.state;

    let MovieCard = userObj.movies.map((item, index) => {
      return (
        <MoviesCard
          key={index}
          index={index}
          movieInfo={item}
          userObj={userObj}
          handleUserObj={this.handleUserObj}
          hideBookmark={false}
        />
      );
    });

    let searchMovies =
      searchedMovies.length > 0 &&
      searchedMovies.map((item, index) => {
        return (
          <MoviesCard
            key={index}
            index={index}
            movieInfo={item}
            userObj={userObj}
            handleUserObj={this.handleUserObj}
            hideBookmark={false}
          />
        );
      });

    return (
      <div>
        <Nav
          handleSearchedMovies={this.handleSearchedMovies}
          showSearhBar={true}
        />

        {searchMovies.length > 0 && (
          <React.Fragment>
            <h1 className="mt-4 ml-4">Searched Movies</h1>
            <div className="movie-card-container">{searchMovies}</div>
          </React.Fragment>
        )}

        <h1 className="mt-4 ml-4">Suggested Movies</h1>
        <div className="movie-card-container">{MovieCard}</div>
      </div>
    );
  }
}

export default Movies;
