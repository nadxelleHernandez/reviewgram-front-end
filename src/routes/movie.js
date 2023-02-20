import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MovieData from "../models/movieData";
import UserData from "../models/userData";
import PropTypes from "prop-types";
import MovieDetails from "../components/moviedetails";
import Reviews from "../components/reviews";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const defaultMovie = new MovieData(
  0,
  "unknown",
  "unknown",
  "unknown",
  "unknown",
  1.0,
  "unknown",
  "unknown",
  "unknown",
  "unknown"
);

const Movie = ({ getMovieData, user, getReviews, addReview }) => {
  const { tmdb_id } = useParams();
  const [movie, setMovie] = useState(defaultMovie);
  const [reviews, setReviews] = useState([]);
  const reviewsRef = useRef();

  useEffect(() => {
    console.log("In Movie route useEffect");
    getMovieData(tmdb_id, "w185").then((data) => {
      setMovie(data);
    });
    getReviews(tmdb_id, true).then((data) => {
      setReviews(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createReview = (review) => {
    addReview(user.id, review).then((response) => {
      if (response.statuscode !== 201) {
        //manage error
        console.log("Error");
      } else {
        const newReview = response.review;
        const newReviewsList = [newReview, ...reviews];
        console.log(newReview);
        setReviews(newReviewsList);
      }
    });
  };

  return (
    <main className="main">
      <Container>
        <Row>
          <Col>
            <MovieDetails movie={movie}></MovieDetails>
          </Col>
          <Col>
            <Reviews
              ref={reviewsRef}
              media={movie}
              reviewsList={reviews}
              createReview={createReview}
            ></Reviews>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

Movie.propTypes = {
  getMovieData: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserData).isRequired,
};

export default Movie;
