import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TVShowData from "../models/TVShowData";
import UserData from "../models/userData";
import Reviews from "../components/reviews";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlertModal from "../components/alertModal";
import TVShowDetails from "../components/tvshowdetails";

const defaultShow = new TVShowData(
  0,
  "unknown",
  "unknown",
  1.0,
  "unknown",
  "unknown",
  "unknown",
  0,
  0,
  "unknown",
  "unknown",
  "unknown",
  "unknown",
  "unknown",
  "unknown"
);

const TVshow = ({
  getShowData,
  user,
  getReviews,
  addReview,
  addToWatchlist,
  addToWatched,
}) => {
  const { tmdb_id } = useParams();
  const [show, setShow] = useState(defaultShow);
  const [reviews, setReviews] = useState([]);
  const reviewsRef = useRef();
  const [showModal, setShowModal] = useState({ show: false, message: "" });

  const showAlert = (message) => {
    setShowModal({ show: true, message: message });
  };

  const handleClose = () => setShowModal({ show: false, message: "" });

  useEffect(() => {
    getShowData(tmdb_id, "w185").then((data) => {
      console.log("In TVshow route useEffect");
      setShow(data);
    });
    getReviews(tmdb_id, false).then((data) => {
      setReviews(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createReview = (review) => {
    addReview(user.user.id, review).then((response) => {
      if (response.statuscode !== 201) {
        //manage error
        console.log("Error");
      } else {
        const newReview = response.review;
        const newReviewsList = [newReview, ...reviews];
        setReviews(newReviewsList);
        showAlert("Review added");
        //reviewsRef.current.changeTab("reviews");
      }
    });
  };

  const toWatchlist = (media) => {
    addToWatchlist(media, user.user).then((response) => {
      if (response.statuscode !== 201) {
        //manage error
        console.log("Error");
      } else {
        console.log(response.entry);
        showAlert(`${response.entry.media.title} added to Watchlist`);
        //Call watchlist route
      }
    });
  };

  const toWatchedlist = (media) => {
    addToWatched(media, user.user).then((response) => {
      if (response.statuscode !== 201) {
        //manage error
        console.log("Error");
      } else {
        console.log(response.entry);
        showAlert(`${response.entry.media.title} added to Watched list`);
        //Call watchlist route
      }
    });
  };

  return (
    <main className="main">
      <Container>
        <Row>
          <Col>
            <TVShowDetails
              userToken={user.token}
              show={show}
              toWatchlist={toWatchlist}
              toWatchedlist={toWatchedlist}
            ></TVShowDetails>
          </Col>
          <Col>
            <Reviews
              userToken={user.token}
              ref={reviewsRef}
              media={show}
              reviewsList={reviews}
              createReview={createReview}
            ></Reviews>
          </Col>
        </Row>
      </Container>
      <AlertModal showModal={showModal} handleClose={handleClose}></AlertModal>
    </main>
  );
};

TVshow.propTypes = {
  //show: PropTypes.instanceOf(TVShowData).isRequired,
  getShowData: PropTypes.func.isRequired,
  //user: PropTypes.instanceOf(UserData).isRequired,
};

export default TVshow;
