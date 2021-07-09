import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { postData } from "../DAL/api";
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
import Header2 from './Header2'
import {getDummyMovies} from '../DAL/api'
 
function Main(props) {
  // const [movies, setMovies] = useState(getMovies());
  const [movies, setMovies] = useState([]);
  const [genre,setGenre]=useState('');
  const [connected, setConnected] = useState(false);
  const handleSelect=(e)=>{
    console.log(e);
    setGenre(e)
  }
  const fetchMoviesHandler = async () => {
    getDummyMovies().then(data => {setMovies(data); console.log(data);})
  }

  const handleLogIn = async (user) =>{
    const response = await postData('http://localhost:3100/logIn', user)
    if (response.length) {
      setConnected(response)
    }
    return response
  }

  const handleLogOut = () =>{
      setConnected(false)
  }

  useEffect(() => {
    fetchMoviesHandler()
    return () => {
      // cleanup
    }
  }, [])

  return (
    <Router>
      <Header2 connected={connected} handleLogOut={handleLogOut} handleSelect={handleSelect}/>
      <div>
        <Switch>
          <Route exact path="/home">
            <HomePage movies={movies} />
          </Route>
          <Route exact path="/logIn">
            <LogIn handleLogIn={handleLogIn}/>
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
