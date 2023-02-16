import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Main from "./routes/main";
import Movie from "./routes/movie";
import TVshow from "./routes/tv-show";
import ErrorPage from "./routes/error-page";

const baseURL = process.env.REACT_APP_BACKEND_URL;
let imageUrl = "";

const getImagesUrlFromAPI = () => {
  return axios
    .get(`${baseURL}/media/image-url`)
    .then((response) => {
      console.log(response.data);
      return response.data.configuration.base_url;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
    });
};

const getShowDataFromAPI = (tmdb_id) => {
  return axios
    .get(`${baseURL}/media/tv/${tmdb_id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const getMovieDataFromAPI = (tmdb_id) => {
  return axios
    .get(`${baseURL}/media/movies/${tmdb_id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

function App() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchData, setSearchData] = useState({});
  const [topMoviesData, setTopMoviesData] = useState({});
  const [topTVShowsData, setTopTVShowsData] = useState({});

  const getShowData = (tmdb_id, size) => {
    return getShowDataFromAPI(tmdb_id).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error");
      } else {
        const tvshow = response.tvshow;
        tvshow.poster_url = `${imageUrl}/${size}${tvshow.poster_url}`;
        console.log(tvshow);
        return tvshow;
      }
    });
  };

  const getMovieData = (tmdb_id, size) => {
    return getMovieDataFromAPI(tmdb_id).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error");
      } else {
        const movie = response.movie;
        movie.poster_url = `${imageUrl}/${size}${movie.poster_url}`;
        console.log(movie);
        return movie;
      }
    });
  };

  const getTopMoviesFromAPI = () => {
    return axios
      .get(`${baseURL}/media/top/movies`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.data);
        return error.response.data;
      });
  };

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
    getImagesUrlFromAPI().then((url) => {
      imageUrl = url;
    });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}/media/top/tvshows`)
  //     // .get(`${process.env.REACT_APP_BACKEND_URL}/media/top/tvshows`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setTopTVShowsData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <Routes>
      <Route
        path="/"
        errorElement={<ErrorPage />}
        element={
          <Main
            getTopMovies={getTopMoviesFromAPI}
            setSearchQuery={setSearchQuery}
            searchData={searchData}
            currentSearch={currentSearch}
            topTVShowsData={topTVShowsData}
          />
        }
      />
      <Route
        path="/movie/:tmdb_id"
        element={<Movie getMovieData={getMovieData} />}
      />
      <Route
        path="/tvshow/:tmdb_id"
        element={<TVshow getShowData={getShowData} />}
      />
    </Routes>
  );
}

export default App;
