import React from "react";
import Card from "react-bootstrap/Card";
import MediaRating from "./mediarating";
import Button from "react-bootstrap/Button";

const TVShowDetails = ({ show, toWatchlist, toWatchedlist }) => {
  const onClickWatched = (event) => {
    toWatchedlist(show);
  };

  const onClickWatchlist = (event) => {
    toWatchlist(show);
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
        <Card.Title>{show.name}</Card.Title>
        <img src={show.poster_url} alt={show.title} />
        <p> </p>
        <Card.Subtitle>Overview</Card.Subtitle>
        <Card.Text>{show.overview}</Card.Text>
        <section className="media">
          <section className="media-data">
            <ul>
              <li>
                Rating:
                <MediaRating rating={show.rating} size="small"></MediaRating>
              </li>
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
      </Card.Body>
    </Card>
  );
};

export default TVShowDetails;
