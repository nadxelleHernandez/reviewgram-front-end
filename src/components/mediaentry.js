import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./mediaentry.css";
import MediaRating from "./mediarating";

const MediaEntry = ({ media }) => {
  let media_type = "";
  if (media.isMovie) {
    media_type = "movie";
  } else {
    media_type = "tv";
  }
  return (
    <Link
      className="text-dark text-decoration-none"
      to={`/${media_type}/${media.TMDB_id}`}
    >
      <Card style={{ width: "10rem", height: "25rem" }}>
        <Card.Img variant="top" src={media.poster_url} alt="top media" />
        <Card.Body className="text-center">
          <Card.Title>{media.isMovie ? media.title : media.name}</Card.Title>
          <Card.Subtitle>
            <MediaRating rating={media.rating} size="small"></MediaRating>
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MediaEntry;
