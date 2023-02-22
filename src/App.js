import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./routes/main";
import Movie from "./routes/movie";
import TVshow from "./routes/tv-show";
import ErrorPage from "./routes/error-page";
import UserList from "./routes/userList";
import NavigationBar from "./components/navigationBar";
import UserDetails from "./routes/user-details";
import CreateUser from "./routes/create-user";
import Footer from "./components/footer";

const baseURL = process.env.REACT_APP_BACKEND_URL;
let imageUrl = "";

const getImagesUrlFromAPI = () => {
  return axios
    .get(`${baseURL}/media/image-url`)
    .then((response) => {
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
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const getSearchDataFromAPI = (query) => {
  return axios
    .post(`${baseURL}/media/search`, { query })
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

const convertGenresListtoString = (genres) => {
  return genres.reduce((genresStr, currentGenre) => {
    return genresStr + " / " + currentGenre;
  });
};

const getReviewsFromAPI = (tmdb_id, isMovie) => {
  const typeMedia = isMovie ? "movies" : "tv";
  const reviewUrl = `${baseURL}/media/${typeMedia}/${tmdb_id}/reviews`;

  return axios
    .get(reviewUrl)
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

const createReviewAPI = (userId, review) => {
  const addReviewUrl = `${baseURL}/users/${userId}/reviews`;
  console.log(review);
  return axios
    .post(addReviewUrl, review)
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

const addToWatchlistAPI = (media, user) => {
  const requestBody = {
    TMDB_id: media.TMDB_id,
    isMovie: media.isMovie,
    title: media.isMovie ? media.title : media.name,
  };
  const url = `${baseURL}/users/${user.id}/watchlist`;
  return axios
    .post(url, requestBody)
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

const addToWatchedAPI = (media, user) => {
  const requestBody = {
    TMDB_id: media.TMDB_id,
    isMovie: media.isMovie,
    title: media.isMovie ? media.title : media.name,
  };
  const url = `${baseURL}/users/${user.id}/watched`;
  return axios
    .post(url, requestBody)
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

const getAuthenticationTokenAPI = (logindata) => {
  const url = `${baseURL}/token`;
  return axios
    .post(url, logindata)
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

const createUserinAPI = (userData) => {
  const url = `${baseURL}/users`;
  return axios
    .post(url, userData)
    .then((response) => {
      console.log("In createUserAPI");
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.statusText);
      console.log(error.response.data);
      return error.response.data;
    });
};

const unsignedUser = {
  token: "",
  user: { id: 0, username: "" },
};

//-----------------Component----------------------------

function App() {
  const [searchData, setSearchData] = useState([]);
  const [user, setUser] = useState(unsignedUser);
  const navigate = useNavigate();

  const doLogin = (logindata) => {
    return getAuthenticationTokenAPI(logindata).then((response) => {
      if (response.statuscode !== 200) {
        console.log("Error while authenticating");
        alert(`Error Authenticating: ${response.message}`);
      } else {
        console.log("Validating user succeded");
        const token = response.token;
        const user = response.user;
        setUser({ token, user });
        return response.token;
      }
    });
  };

  const clearSearch = () => {
    setSearchData([]);
  };

  const logOut = () => {
    setUser(unsignedUser);
    navigate("/", { replace: true });
    clearSearch();
  };

  const getShowData = (tmdb_id, size) => {
    return getShowDataFromAPI(tmdb_id).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error");
      } else {
        const tvshow = response.tvshow;
        tvshow.poster_url = tvshow.poster_url
          ? `${imageUrl}${size}${tvshow.poster_url}`
          : null;
        tvshow.genres = convertGenresListtoString(tvshow.genres);
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
        movie.poster_url = movie.poster_url
          ? `${imageUrl}${size}${movie.poster_url}`
          : null;
        movie.genres = convertGenresListtoString(movie.genres);
        return movie;
      }
    });
  };

  const getTopMoviesFromAPI = () => {
    return axios
      .get(`${baseURL}/media/top/movies`)
      .then((response) => {
        const top_movies = response.data["movies"];
        for (let movie of top_movies) {
          if (movie.poster_url) {
            movie.poster_url = `${imageUrl}w154${movie.poster_url}`;
          }
        }
        return top_movies;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const getTopTVShowsFromAPI = () => {
    return axios
      .get(`${baseURL}/media/top/tvshows`)
      .then((response) => {
        const top_tvshows = response.data["tvshows"];
        for (let tvshow of top_tvshows) {
          if (tvshow.poster_url) {
            tvshow.poster_url = `${imageUrl}w154${tvshow.poster_url}`;
          }
        }
        return top_tvshows;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const getSearchData = (search_for) => {
    getSearchDataFromAPI(search_for).then((response) => {
      if (response.statuscode !== 200) {
        alert(`There was an error while searching \n ${response.message}`);
        console.log("Error getting search data");
      } else {
        const search_result = response.data;
        if (search_result.length === 0) {
          alert("No search results available");
        }
        for (let entry of search_result) {
          if (entry.poster_url) {
            entry.poster_url = `${imageUrl}w342${entry.poster_url}`;
          }
        }
        setSearchData(search_result);
      }
    });
  };

  const getUserWatchList = (user_id) => {
    return axios
      .get(`${baseURL}/users/${user_id}/watchlist`)
      .then((response) => {
        const user_watchlist = response.data["watchlist"];
        for (let media of user_watchlist) {
          if (media["media"].poster_url) {
            media[
              "media"
            ].poster_url = `${imageUrl}w154${media["media"].poster_url}`;
          }
        }
        return user_watchlist;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const getUserWatchedList = (user_id) => {
    return axios
      .get(`${baseURL}/users/${user_id}/watched`)
      .then((response) => {
        const user_watchedlist = response.data["watched"];
        for (let media of user_watchedlist) {
          if (media["media"].poster_url) {
            media[
              "media"
            ].poster_url = `${imageUrl}w154${media["media"].poster_url}`;
          }
        }
        return user_watchedlist;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  const getReviews = (tmdb_id, isMovie) => {
    return getReviewsFromAPI(tmdb_id, isMovie).then((response) => {
      if (response.statuscode !== 200) {
        //manage error
        console.log("Error getting reviews for Media");
      } else {
        return response.reviews;
      }
    });
  };

  const sendNewUser = (userData) => {
    return createUserinAPI(userData).then((response) => {
      if (response.statuscode !== 201) {
        //manage error
        console.log("Error");
      } else {
        const newUser = response.user;
        alert(`User created: \n Welcome ${newUser.username} to Reviewgram`);
        doLogin(newUser);
        navigate("/", { replace: true });
        return newUser;
      }
    });
  };

  useEffect(() => {
    getImagesUrlFromAPI().then((url) => {
      imageUrl = url;
      console.log("In app useEffect");
    });
  }, []);

  return (
    <>
      <NavigationBar
        user={user}
        authenticated={false}
        handleLogin={doLogin}
        logOut={logOut}
      ></NavigationBar>

      <Routes>
        <Route
          path="/UserList/:user_id"
          element={
            <UserList
              getUserWatchList={getUserWatchList}
              getUserWatchedList={getUserWatchedList}
              user={user}
            />
          }
        ></Route>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={
            <Main
              getTopMovies={getTopMoviesFromAPI}
              getSearchData={getSearchData}
              searchData={searchData}
              getTopTVShows={getTopTVShowsFromAPI}
              clearSearch={clearSearch}
            />
          }
        />
        <Route
          path="/movie/:tmdb_id"
          element={
            <Movie
              getMovieData={getMovieData}
              user={user}
              getReviews={getReviews}
              addReview={createReviewAPI}
              addToWatchlist={addToWatchlistAPI}
              addToWatched={addToWatchedAPI}
            />
          }
        />
        <Route
          path="/tv/:tmdb_id"
          element={
            <TVshow
              getShowData={getShowData}
              user={user}
              getReviews={getReviews}
              addReview={createReviewAPI}
              addToWatchlist={addToWatchlistAPI}
              addToWatched={addToWatchedAPI}
            />
          }
        />
        <Route path="/user/:id" element={<UserDetails user={user} />} />
        <Route
          path="/user"
          element={<CreateUser sendNewUser={sendNewUser} />}
        />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
