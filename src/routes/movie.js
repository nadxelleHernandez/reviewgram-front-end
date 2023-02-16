import React from "react";
import { useParams } from "react-router-dom";

const Movie = (props) => {
  const { tmdb_id } = useParams();
  return (
    <main>
      <section className="media">
        <h1>Movie Name</h1>
        <image></image>
        <section className="media-data">
          <ul>
            <li>movie data </li>
            <li>movie data</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default Movie;
