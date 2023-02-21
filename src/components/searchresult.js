import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

const SearchResult = ({ media }) => {
  const linkToGo = media.isMovie
    ? `/movie/${media.TMDB_id}`
    : `/tv/${media.TMDB_id}`;

  console.log(media.poster_url);
  return (
    <Card className="">
      <Row>
        <Col>
          <Card.Img
            src={media.poster_url ? media.poster_url : ""}
            alt={media.title}
          />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{media.title}</Card.Title>
            <Card.Text>Overview: {media.overview}</Card.Text>
            <Button variant="link">
              <Link to={linkToGo}>More Details</Link>
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default SearchResult;
