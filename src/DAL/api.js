const movies = [
  {
    name: "Superman",
    synopsis: "A very good movie!",
    genre: "Action",
    imgSrc:
      "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
  },
  {
    name: "Wonder Woman",
    synopsis: "Classic movie!",
    genre: "Drama",
    imgSrc: "https://www.booknet.co.il/Images/Site/Products/9781524770983.jpg",
  },
  {
    name: "Spiderman",
    synopsis: "Like it!",
    genre: "Romantic",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/en/0/02/The_Amazing_Spider-Man_theatrical_poster.jpeg",
  },
  {
    name: "Ant-Man",
    synopsis: "Funny!",
    genre: "Comedy",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/he/thumb/7/75/Ant-Man_poster.jpg/250px-Ant-Man_poster.jpg",
  },
  {
    name: "Avengers ",
    synopsis: "Funny!",
    genre: "Action",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._AC_SL1500_.jpg",
  },
];

const getMovies = () => {
  return movies;
};
async function getDummyMovies() {
  const response = await fetch(`http://localhost:3100/movies`)
  const resolve = await response.json()
  return resolve
  // const data = await Promise.resolve([
  //   {
  //     id: 3,
  //     user_id: 3,
  //     movie_name: "Superman",
  //     synopsis: "A movie about Klark Kent",
  //     trailer_url: "https://www.youtube.com/watch?v=T6DJcgm3wNY&t=110s",
  //     post_date: "2021-03-27 00:00:00",
  //   },
  //   {
  //     id: 1,
  //     user_id: 3,
  //     movie_name: "Spider-Man",
  //     synopsis: "A movie about Spider",
  //     trailer_url: "https://www.youtube.com/watch?v=T6DJcgm3wNY&t=110s",
  //     post_date: "2021-03-27 00:00:00",
  //   },
  //   {
  //     id: 2,
  //     user_id: 3,
  //     movie_name: "Wonder Woman",
  //     synopsis: "A movie about lady",
  //     trailer_url: "https://www.youtube.com/watch?v=T6DJcgm3wNY&t=110s",
  //     post_date: "2021-03-27 00:00:00",
  //   },
  //   {
  //     id: 1,
  //     user_id: 3,
  //     movie_name: "Ant-Man",
  //     synopsis: "A movie about an ant",
  //     trailer_url: "https://www.youtube.com/watch?v=T6DJcgm3wNY&t=110s",
  //     post_date: "2021-03-27 00:00:00",
  //   },
  // ]);
  // return data;
}
async function getUsers() {
  const data = await Promise.resolve([
    {
      id: 1,
      user_name: "RonGamzu",
      email: "ron312@gmail.com",
      password: 1234567,
    },
    {
      id: 2,
      user_name: "DanGeramn",
      email: "Dan123@gmail.com",
      password: 10101,
    },
    {
      id: 3,
      user_name: "GuyWix",
      email: "Guy775@walla.com",
      password: 40500,
    },
  ]);
  return data;
}
async function getGenres() {
  const data = await Promise.resolve([
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Comedy",
    },
    {
      id: 3,
      name: "Drama",
    },
    {
      id: 4,
      name: "Romantic",
    },
  ]);
  return data;
}
async function getReviews() {
  const data = await Promise.resolve([
    {
      id: 1,
      movie_id: 1,
      user_id: 1,
      title: "Excellent",
      post_date: "2021-03-27 00:00:00",
      rating: 5,
      review_body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            And more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
    },
    {
      id: 2,
      movie_id: 2,
      user_id: 3,
      title: "Bad",
      post_date: "2021-03-27 00:00:00",
      rating: 1,
      review_body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              And more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
    },
    {
      id: 3,
      movie_id: 1,
      user_id: 2,
      title: "Good",
      post_date: "2021-03-27 00:00:00",
      rating: 3,
      review_body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              And more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
    },
  ]);
  return data;
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function setUsers(user) {
  dummyUsers.push(user);
}
async function setMovie(movie) {
  dummyMovies.push(movie);
}
async function setGenre(genre) {
  dummyGenres.push(genre);
}
async function setReview(review) {
  dummyReviews.push(review);
}
const dummyUsers = [];
const dummyMovies = [];
const dummyGenres = [];
const dummyReviews = [];
const dummyMovieGenres = [];
const dummyMoviesImages = [];
const dummyUserFavorites = [];

export { getMovies ,getDummyMovies, postData};
