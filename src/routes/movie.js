import React from "react";
import { useParams } from "react-router-dom";
import MovieData from "../models/movieData";
import PropTypes from "prop-types";

const Movie = ({ movie, getMovieData, user }) => {
  const { tmdb_id } = useParams();
  return (
    <main>
      <section className="media">
        <h1>{movie.title}</h1>
        <image></image>
        <section className="media-data">
          <ul>
            <li>movie data </li>
            <li>movie data</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

Movie.propTypes = {
  movie: PropTypes.instanceOf(MovieData).isRequired,
  getMovieData: PropTypes.func.isRequired,
  user: PropTypes,
};

export default Movie;
