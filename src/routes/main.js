import React from "react";
import Search from "../components/search";
import TopTVShows from "../components/toptvshows";
import TopMovies from "../components/topmovies";
import SearchResults from "../components/searchResults";
import "./main.css";

const Main = ({ getTopMovies, getSearchData, searchData, getTopTVShows }) => {
  return (
    <main>
      <main className="main">
        <header className="header">
          <h1 id="AppName">ReviewGram</h1>

          <section id="Search">
            <Search createNewSearch={getSearchData}></Search>
          </section>
        </header>
        <section id="SearchResults">
          <SearchResults searchData={searchData}></SearchResults>
        </section>
        <div id="Trending">
          <section className="Media">
            <TopMovies
              id="TopMovies"
              toggleShow={searchData === []}
              getTopMovies={getTopMovies}
            ></TopMovies>
          </section>
          <section className="Media">
            <TopTVShows
              id="TopTVShows"
              toggleShow={searchData === []}
              getTopTVShows={getTopTVShows}
            ></TopTVShows>
          </section>
        </div>
      </main>
    </main>
  );
};

export default Main;
