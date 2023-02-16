import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import TVShowData from "../models/TVShowData";
import UserData from "../models/userData";
//import Poster from "../components/media-components/poster";
//import { Img } from "react-image";

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

const TVshow = ({ getShowData, user }) => {
  const { tmdb_id } = useParams();
  const [show, setShow] = useState(defaultShow);

  useEffect(() => {
    getShowData(tmdb_id, "w185").then((data) => {
      console.log(data);
      setShow(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <section className="media">
        <h1>{show.name}</h1>
        <img src={show.poster_url} alt={show.name} />
        <section className="media-data">
          <h2>Details</h2>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{show.overview}</p>
            </li>
            <li>Rating: {show.rating}</li>
            <li>Original Language: {show.original_language}</li>
            <li>Origin Country: {show.origin_country}</li>
            <li>Number of Episodes: {show.number_of_episodes}</li>
            <li>Number of Seasons: {show.number_of_seasons}</li>
            <li>Status: {show.status}</li>
            <li>First Air Date: {show.first_air_date}</li>
            <li>Last Air Date: {show.last_air_date}</li>
            <li>Episode Runtime: {show.episode_runtime}</li>
            <li>Genres: {show.genres}</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

TVshow.propTypes = {
  //show: PropTypes.instanceOf(TVShowData).isRequired,
  getShowData: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(UserData).isRequired,
};

export default TVshow;
