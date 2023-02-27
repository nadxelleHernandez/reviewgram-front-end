import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import MediaEntry from "../components/media-components/mediaentry";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";

const UserList = ({ getUserWatchList, getUserWatchedList, user }) => {
  const { user_id } = useParams();
  const [userWatchList, setUserWatchList] = useState([]);
  const [userWatchedList, setUserWatchedList] = useState([]);

  const userWatchListEntries = userWatchList.map((watchlist) => {
    return (
      <div key={watchlist.id}>
        <MediaEntry media={watchlist["media"]}></MediaEntry>
      </div>
    );
  });

  const userWatchedEntries = userWatchedList.map((watchedlist) => {
    return (
      <div key={watchedlist.id}>
        <MediaEntry media={watchedlist["media"]}></MediaEntry>
      </div>
    );
  });

  useEffect(() => {
    getUserWatchList(user_id, "w185").then((data) => {
      console.log("In user watch list route useEffect");
      console.log(data);
      setUserWatchList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserWatchedList(user_id, "w185").then((data) => {
      console.log("In user watched list route useEffect");
      console.log(data);
      setUserWatchedList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <p></p>
      <Container className="overflow-auto">
        <p>{user.user.username}'s Watch list</p>
        <Col className="d-flex">{userWatchListEntries}</Col>
      </Container>
      <p></p>
      <p></p>
      <Container className="overflow-auto">
        <p>{user.user.username}'s Watched list</p>
        <Col className="d-flex">{userWatchedEntries}</Col>
      </Container>
    </Container>
  );
};
UserList.propTypes = {
  getUserWatchList: PropTypes.func.isRequired,
};
export default UserList;
