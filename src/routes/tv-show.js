import React from "react";
import { useParams } from "react-router-dom";

const TVshow = (props) => {
  const { tmdb_id } = useParams();

  return (
    <main>
      <section className="media">
        <h1>Tvshow Name</h1>
        <image></image>
        <section className="media-data">
          <ul>
            <li>show data </li>
            <li>show data</li>
          </ul>
        </section>
      </section>
    </main>
  );
};

export default TVshow;
