import React from "react";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
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
      <div className="card" key={movie.TMDB_id}>
        <MediaEntry media={movie}></MediaEntry>
      </div>
    );
  });

  useEffect(() => {
    getTopMovies().then((result) => {
      console.log("In getTopMovies useEffect");
      setTopMoviesData(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Top Popular Movies</p>

      <Col className="d-flex">{movieEntries}</Col>
    </div>
  );
};

export default TopMovies;
