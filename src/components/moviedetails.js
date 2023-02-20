import React from "react";
import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";
import Button from "react-bootstrap/Button";

const MovieDetails = ({ movie, toWatchlist, toWatchedlist }) => {
  const onClickWatched = (event) => {
    toWatchedlist(movie);
  };

  const onClickWatchlist = (event) => {
    toWatchlist(movie);
  };

  return (
    <Card style={{ height: "85vh" }}>
      <Card.Header className="d-flex justify-content-end ">
        <Button variant="light" size="sm" disabled>
          Add
        </Button>
        <Button onClick={onClickWatchlist} variant="light" size="sm">
          To Watchlist
        </Button>{" "}
        <Button onClick={onClickWatched} variant="light" size="sm">
          To Watched
        </Button>
      </Card.Header>
      <Card.Body className="overflow-auto">
        <Card.Title>{movie.title}</Card.Title>
        <img src={movie.poster_url} alt={movie.title} />
        <p> </p>
        <Card.Subtitle>Overview</Card.Subtitle>
        <Card.Text>{movie.overview}</Card.Text>
        <section className="media">
          <section className="media-data">
            <ul>
              <li>
                Rating:
                <MediaRating rating={movie.rating} size="small"></MediaRating>
              </li>
              <li>Original Language: {movie.original_language}</li>
              <li>Status: {movie.status}</li>
              <li>Release date: {movie.release_date}</li>
              <li>Runtime: {movie.runtime} mins</li>
              <li>Genres: {movie.genres}</li>
            </ul>
          </section>
        </section>
      </Card.Body>
    </Card>
  );
};

export default MovieDetails;
