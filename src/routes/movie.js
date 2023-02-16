import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieData from "../models/movieData";
import UserData from "../models/userData";
import PropTypes from "prop-types";
//import { Img } from "react-image";

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

const Movie = ({ getMovieData, user }) => {
  const { tmdb_id } = useParams();
  const [movie, setMovie] = useState(defaultMovie);

  useEffect(() => {
    getMovieData(tmdb_id, "w185").then((data) => {
      console.log(data);
      setMovie(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="media">
        <h1>{movie.title}</h1>
        <img src={movie.poster_url} alt={movie.title} />
        <section className="media-data">
          <h2>Details</h2>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </li>
            <li>Rating: {movie.rating}</li>
            <li>Original Language: {movie.original_language}</li>
            <li>Status: {movie.status}</li>
            <li>Release date: {movie.release_date}</li>
            <li>Runtime: {movie.runtime}</li>
            <li>Genres: {movie.genres}</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

Movie.propTypes = {
  getMovieData: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserData).isRequired,
};

export default Movie;
