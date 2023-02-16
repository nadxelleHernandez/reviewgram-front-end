import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Movie from "./routes/movie";
import TVshow from "./routes/tv-show";
import ErrorPage from "./routes/error-page";

//const baseURL = "http://127.0.0.1:5000";
const baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchData, setSearchData] = useState({});
  const [topMoviesData, setTopMoviesData] = useState({});
  const [topTVShowsData, setTopTVShowsData] = useState({});

  const setSearchQuery = (search_for) => {
    console.log(search_for);
    setCurrentSearch(search_for);
  };

  // useEffect(() => {
  //   console.log(currentSearch);
  //   axios
  //     .post(`${baseURL}/media/search`, { query: currentSearch })
  //     .then((response) => {
  //       setSearchData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //     });
  // }, [currentSearch]);

  useEffect(() => {
    axios
      .get(`${baseURL}/media/top/movies`)
      .then((response) => {
        console.log(response.data);
        setTopMoviesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/media/top/tvshows`)
      // .get(`${process.env.REACT_APP_BACKEND_URL}/media/top/tvshows`)
      .then((response) => {
        console.log(response.data);
        setTopTVShowsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        errorElement={<ErrorPage />}
        element={
          <Main
            setSearchQuery={setSearchQuery}
            searchData={searchData}
            currentSearch={currentSearch}
            topMoviesData={topMoviesData}
            topTVShowsData={topTVShowsData}
          />
        }
      />
      <Route path="/movie/:tmdb_id" element={<Movie />} />
      <Route path="/tvshow/:tmdb_id" element={<TVshow />} />
    </Routes>
  );
}

export default App;
