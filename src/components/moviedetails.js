import React from "react";
import Rating from "@mui/material/Rating";
import Card from "react-bootstrap/Card";

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
                <Rating
                  value={(movie.rating * 5) / 10}
                  precision={0.25}
                  readOnly
                ></Rating>{" "}
                {movie.rating}
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
