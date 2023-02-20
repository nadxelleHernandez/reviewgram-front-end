import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import MediaEntry from "../components/mediaentry";

const UserList = ({ getUserWatchList }) => {
  const { user_id } = useParams();
  const [userWatchList, setUserWatchList] = useState([]);

  const userWatchListEntries = userWatchList.map((watchlist) => {
    return (
      <div key={watchlist.id}>
        <MediaEntry media={watchlist["media"]}></MediaEntry>
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
  return (
    <div>
      <p>User Watch list</p>
      <ol>{userWatchListEntries}</ol>
    </div>
  );
};
UserList.propTypes = {
  getUserWatchList: PropTypes.func.isRequired,
};
export default UserList;
