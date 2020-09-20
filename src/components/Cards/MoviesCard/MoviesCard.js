import React, { Component } from "react";

import { Modal, Button } from "react-bootstrap";
import axios from "../../../axios";

import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import "./MoviesCard.css";

class MoviesCard extends Component {
  constructor() {
    super();
    this.state = {
      baseImgURL: "https://image.tmdb.org/t/p/w500",
      bookmark: false,
      showModal: false,
      moreInfo: [],
    };
  }

  async componentDidMount() {
    const { userObj, index, movieInfo } = this.props;
    if (movieInfo.bookmark && movieInfo.bookmark) {
      if (movieInfo.bookmark === true) {
        this.setState({
          bookmark: true,
        });
      } else {
        this.setState({
          bookmark: false,
        });
      }
    } else {
      this.setState({
        bookmark: false,
      });
    }

    try {
      const data = await axios.get(
        `movie/${movieInfo.id}?api_key=04109009dab22c4ad6a56c7b523fa4b9&language=en-US`
      );
      this.setState({
        moreInfo: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleBookmark = (movieInfo, index) => {
    const { bookmark } = this.state;
    const { userObj } = this.props;
    let tempUserObj = userObj;
    let idx = null;

    this.setState({
      bookmark: !bookmark,
    });

    tempUserObj.bookmarked.forEach((item, i) => {
      if (movieInfo.id === item.id) {
        idx = i;
      }
    });

    if (idx === null) {
      tempUserObj.bookmarked.push(movieInfo);
      tempUserObj.movies[index].bookmark = true;
      this.props.handleUserObj(tempUserObj);
    } else {
      tempUserObj.movies[index].bookmark = false;
      tempUserObj.bookmarked.splice(idx, 1);
      this.props.handleUserObj(tempUserObj);
    }
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  handleShow = () => {
    this.setState({
      showModal: true,
    });
    console.log("moreInfo: ", this.state.moreInfo);
  };

  render() {
    const { movieInfo, index } = this.props;
    const { baseImgURL, bookmark, showModal, moreInfo } = this.state;

    let genre =
      moreInfo.genres &&
      moreInfo.genres.map((item, index) => {
        return (
          <div key={index} className="tag-button">
            <p className="text">{item.name}</p>
          </div>
        );
      });

    return (
      <React.Fragment>
        <Modal show={showModal} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className=".college-card-container-modal"
              onClick={this.handleShow}
            >
              <div className="image-container-modal">
                <img
                  src={baseImgURL + movieInfo.poster_path}
                  className="card-img-top image"
                  alt="..."
                />
                {this.props.hideBookmark === false && (
                  <div
                    className="rating-container"
                    onClick={() => this.handleBookmark(movieInfo, index)}
                  >
                    <p className="rating">
                      {bookmark ? (
                        <i className="fas fa-bookmark"></i>
                      ) : (
                        <i className="far fa-bookmark"></i>
                      )}
                    </p>
                  </div>
                )}
              </div>
              <div className="info-container">
                <div className="name-rating-discount">
                  <div className="name">{movieInfo.title}</div>
                </div>
                <div className="near-place-with-fees">
                  <div className="near-place">{movieInfo.overview}</div>
                </div>
                <div className="offer-amenties"></div>
                <div className="tags">
                  <div className="tag-button">
                    <p className="text">
                      {" "}
                      {"Rating" + " " + movieInfo.vote_average}
                    </p>
                  </div>
                  <div className="tag-button">
                    <p className="text">
                      {" "}
                      {"Vote" + " " + movieInfo.vote_count}
                    </p>
                  </div>
                </div>

                <div className="tags-modal tags mb-3">
                  <p className="mt-1 mb-0">Genre</p>
                  {genre}
                </div>

                <div className="tags-modal tags mb-3">
                  <p className="mt-1 mb-0">Run Time</p>
                  <div className="tag-button">
                    <p className="text">{moreInfo.runtime + " min."}</p>
                  </div>
                </div>

                <div className="tags-modal tags mb-3">
                  <p className="mt-1 mb-0">Revenue</p>
                  <div className="tag-button">
                    <p className="text">{moreInfo.revenue + " USD"}</p>
                  </div>
                </div>

                <div className="tags-modal tags mb-3">
                  <p className="mt-1 mb-0">Release date</p>
                  <div className="tag-button">
                    <p className="text">{moreInfo.release_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <div className="college-card-container">
          <div className="image-container">
            <img
              src={baseImgURL + movieInfo.poster_path}
              className="card-img-top image"
              alt="..."
            />
            {this.props.hideBookmark === false && (
              <div
                className="rating-container"
                onClick={() => this.handleBookmark(movieInfo, index)}
              >
                <p className="rating">
                  {bookmark ? (
                    <i className="fas fa-bookmark"></i>
                  ) : (
                    <i className="far fa-bookmark"></i>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="info-container">
            <div className="name-rating-discount">
              <div className="name">{movieInfo.title}</div>
            </div>
            <div className="near-place-with-fees">
              <div className="near-place">{movieInfo.overview}</div>
            </div>
            <div className="offer-amenties"></div>
            <div className="tags">
              <div className="tag-button">
                <p className="text">
                  {" "}
                  {"Rating" + " " + movieInfo.vote_average}
                </p>
              </div>
              <div className="tag-button">
                <p className="text"> {"Vote" + " " + movieInfo.vote_count}</p>
              </div>
              <Button
                className="ml-auto"
                variant="info"
                onClick={this.handleShow}
              >
                More info
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MoviesCard;
