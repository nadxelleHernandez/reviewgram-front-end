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
  console.log(topTVShowsData);
  const tvshowEntries = topTVShowsData.map((tvshow) => {
    return (
      <li key={tvshow.TMDB_id}>
        <MediaEntry media={tvshow}></MediaEntry>
      </li>
    );
  });

  useEffect(() => {
    getTopTVShows().then((result) => {
      console.log(result.tvshows);
      setTopTVShowsData(result.tvshows);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Top TV Shows</p>
      <ol>{tvshowEntries}</ol>
    </div>
  );
};

export default TopTVShows;
