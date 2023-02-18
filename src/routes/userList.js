import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const UserList = ({ getUserWatchList }) => {
  const { user_id } = useParams();
  const [userWatchList, setUserWatchList] = useState([]);

  useEffect(() => {
    getUserWatchList(user_id, "w185").then((data) => {
      console.log("In user watch list route useEffect");
      console.log(data);
      setUserWatchList(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <main>User List</main>;
};
UserList.propTypes = {
  getUserWatchList: PropTypes.func.isRequired,
};
export default UserList;
