import React, { Component } from "react";

import Nav from "../../components/Shared/Nav/Nav";
import MoviesCard from "../../components/Cards/MoviesCard/MoviesCard";
import { secureStorage } from "../../utils/clientStorage/clientStorage";

import "./Bookmark.css";

class Bookmark extends Component {
  constructor() {
    super();
    this.state = {
      userObj: secureStorage.getItem(sessionStorage.currentUser),
    };
  }

  componentDidMount() {
    this.getBookmarked();
  }

  getBookmarked = async () => {};

  render() {
    const { userObj } = this.state;

    let MovieCard = userObj.bookmarked.map((item, index) => {
      return (
        <MoviesCard
          key={index}
          index={index}
          movieInfo={item}
          userObj={userObj}
          hideBookmark={true}
        />
      );
    });
    return (
      <div>
        <Nav showSearhBar={false} />
        <div className="movie-card-container">{MovieCard}</div>
      </div>
    );
  }
}

export default Bookmark;
