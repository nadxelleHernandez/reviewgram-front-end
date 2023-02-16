import React from "react";
import { useEffect, useState } from "react";
import MovieData from "../models/movieData";
import MediaEntry from "./mediaentry";

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

const TopMovies = ({ toggleShow, getTopMovies }) => {
  const [topMoviesData, setTopMoviesData] = useState([defaultMovie]);

  const movieEntries = topMoviesData.map((movie) => {
    return (
      <li key={movie.TMDB_id}>
        <MediaEntry media={movie}></MediaEntry>
      </li>
    );
  });

  useEffect(() => {
    console.log(getTopMovies);
    getTopMovies().then((result) => {
      console.log(result.movies);
      setTopMoviesData(result.movies);
    });
  }, []);

  return (
    <div>
      <p>Top Movies</p>
      <ul>{movieEntries}</ul>
    </div>
  );
};

export default TopMovies;
