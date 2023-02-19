import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

const Movie = ({ getMovieData, user, getReviews }) => {
  const { tmdb_id } = useParams();
  const [movie, setMovie] = useState(defaultMovie);
  const [reviews, setReviews] = useState([]);

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

  return (
    <main className="main">
      <Container>
        <Row>
          <Col>
            <MovieDetails movie={movie}></MovieDetails>
          </Col>
          <Col>
            <Reviews media={movie} reviewsList={reviews}></Reviews>
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
