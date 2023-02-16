import React from "react";
import Search from "../components/search";
import TopTVShows from "../components/toptvshows";
import TopMovies from "../components/topmovies";
import SearchResults from "../components/searchResults";
import { Link } from "react-router-dom";

const Main = ({
  setSearchQuery,
  searchData,
  currentSearch,
  topMoviesData,
  topTVShowsData,
}) => {
  return (
    <main>
      <main className="main">
        <header>
          <h1>ReviewGram</h1>
        </header>
        <section>
          <Search createNewSearch={setSearchQuery}></Search>
        </section>
        <section>
          <p>
            Fake result: <Link to="/tvshow/100088">Last of Us</Link>
          </p>
          <SearchResults searchData={searchData}></SearchResults>
        </section>
        <section>
          <TopMovies
            toggleShow={currentSearch === ""}
            topMoviesData={topMoviesData}
          ></TopMovies>
        </section>
        <section>
          <TopTVShows
            toggleShow={currentSearch === ""}
            topTVShowsData={topTVShowsData}
          ></TopTVShows>
        </section>
      </main>
    </main>
  );
};

export default Main;
