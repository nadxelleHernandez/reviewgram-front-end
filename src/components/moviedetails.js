import React from "react";
import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";

const MovieDetails = ({ movie }) => {
  return (
    <Card>
      <Card.Header>
        <h1>{movie.title}</h1>
      </Card.Header>
      <Card.Body>
        <section className="media">
          <img src={movie.poster_url} alt={movie.title} />
          <section className="media-data">
            <ul>
              <li>
                Overview:
                <p>{movie.overview}</p>
              </li>
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
