import React from "react";
import { useState, useEffect } from "react";
import TVShowData from "../models/TVShowData";
import MediaEntry from "./mediaentry";

const defaultTVShow = new TVShowData(
  0,
  "",
  "",
  0.0,
  "",
  "",
  "",
  0,
  0,
  "",
  "",
  "",
  0,
  ""
);

const TopTVShows = ({ toggleShow, getTopTVShows }) => {
  const [topTVShowsData, setTopTVShowsData] = useState([defaultTVShow]);

  const tvshowEntries = topTVShowsData.map((tvshow) => {
    return (
      <div key={tvshow.TMDB_id}>
        <MediaEntry media={tvshow}></MediaEntry>
      </div>
    );
  });

  useEffect(() => {
    getTopTVShows().then((result) => {
      console.log("In getTopTVShows useEffect");
      setTopTVShowsData(result);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Top popular TV Shows</p>
      <ol>{tvshowEntries}</ol>
    </div>
  );
};

export default TopTVShows;
