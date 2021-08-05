import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { postData } from "../DAL/api";
import HomePage from "./HomePage";
import GenrePage from "./GenrePage";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import AddReview from "./AddReview";
import MyReviews from "./MyReviews";
import EditReview from "./EditReview";
import Header from "./Header";
import { getAllMovies, getAllGenres } from "../DAL/api";
import MoviePage from "./MoviePage";
import AuthApi from "./AuthApi";
import ProtectedRoute from "./ProtectedRoute";
import Cookies from "js-cookie";
function Main(props) {
  // const [movies, setMovies] = useState(getMovies());
  const [movies, setMovies] = useState([]);
  const [connected, setConnected] = useState(false);
  const [genres, setGenres] = useState([]);

  // const [auth, setAuth] = useState(false);
  // const Auth = useContext(AuthApi);

  useEffect(async () => {
    const allGenres = await getAllGenres();
    setGenres(allGenres[0]);
  }, []);

  const getMoviesData = async () => {
    getAllMovies().then((data) => {
      setMovies(data[0]);
    });
  };

  const handleLogIn = async (user) => {
    const response = await postData("http://localhost:3100/logIn", user);
    if (response.length) {
      setConnected(response);
      Cookies.set("user", response);
    }
    return response;
  };

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setConnected(JSON.parse(user));
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  const handleSignUp = async (user) => {
    const response = await postData("http://localhost:3100/signUp", user);
    if (response[0][0]) {
      setConnected(response[0]);
    }
    return response[0];
  };

  const handleLogOut = () => {
    setConnected(false);
    Cookies.remove("user");
  };

  useEffect(() => {
    getMoviesData();
  }, []);
  return (
    // <AuthApi.Provider value={{ connected, setConnected }}>
    <Router>
      <Header
        connected={connected}
        handleLogOut={handleLogOut}
        genres={genres}
      />
      <div>
        <Switch>
          <Route exact path="/home">
            <HomePage movies={movies} />
          </Route>
          <Route exact path="/logIn">
            <LogIn handleLogIn={handleLogIn} />
          </Route>
          <Route exact path="/signUp">
            <SignUp
              readCookie={readCookie}
              handleLogIn={handleLogIn}
              connected={connected}
              handleSignUp={handleSignUp}
              genres={genres}
            />
          </Route>
          <Route exact path="/genrePage/:genreId">
            <GenrePage movies={movies} genres={genres} />
          </Route>
          <Route exact path="/allMovies">
            <AllMovies movies={movies} />
          </Route>
          <Route exact path="/moviePage/:id">
            <MoviePage connected={connected}/>
          </Route>
          {/* <Route exact path="/myReviews">
            <MyReviews connected={connected} />
          </Route> */}
          <ProtectedRoute
            exact
            path="/myReviews"
            connected={connected}
            component={MyReviews}
          />
          <Route exact path="/addReview">
            <AddReview connected={connected} />
          </Route>
          <Route exact path="/addReview/:movieName">
            <AddReview connected={connected} />
          </Route>
          <Route exact path="/editReview/:id">
            <EditReview connected={connected} />
          </Route>
          <Route exact path="/addMovie">
            <AddMovie
              getMoviesData={getMoviesData}
              connected={connected}
              genres={genres}
            />
          </Route>
          <Route exact path="/">
            <HomePage movies={movies} />
          </Route>
        </Switch>
      </div>
    </Router>
    // </AuthApi.Provider>
  );
}

export default Main;
