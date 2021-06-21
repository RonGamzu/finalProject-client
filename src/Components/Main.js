import React, { useState } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getMovies } from "../DAL/api";
import TopBox from "./TopBox";
import HomePage from "./HomePage";
import GenrePage from "./GenrePage";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AllMovies from "./AllMovies";
import Profile from "./Profile";
import AddMovie from "./AddMovie";
import AddReview from "./AddReview";
import ReviewPage from "./ReviewPage";
import MyReviews from "./MyReviews";

function Main(props) {
  const [movies, setMovies] = useState(getMovies());
  const [genre,setGenre]=useState('');
  const [connected, setConnected] = useState(true);
  const handleSelect=(e)=>{
    console.log(e);
    setGenre(e)
  }
  return (
    <Router>
      <Header connected={connected} handleSelect={handleSelect}/>
      <div>
        <Switch>
          <Route exact path="/home">
            <HomePage movies={movies} />
          </Route>
          <Route exact path="/logIn">
            <LogIn />
          </Route>
          <Route exact path="/signUp">
            <SignUp genres= {['Action', 'Comedy', 'Drama', 'Romantic']}/>
          </Route>
          <Route exact path="/genrePage">
              <GenrePage movies={movies} genre={genre}/>
          </Route>
          <Route exact path="/allMovies">
              <AllMovies movies={movies}/>
          </Route>
          <Route exact path="/reviewPage">
          <ReviewPage />
          </Route>
          <Route exact path="/myReviews">
          <MyReviews />
          </Route>
          <Route exact path="/addReview">
          <AddReview />
          </Route>
          <Route exact path="/addMovie">
          <AddMovie genres= {['Action', 'Comedy', 'Drama', 'Romantic']}/>
          </Route>
          <Route exact path="/profile">
          <Profile genres= {['Action', 'Comedy', 'Drama', 'Romantic']}/>
          </Route>
          <Route exact path="/">
          <HomePage movies={movies} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
