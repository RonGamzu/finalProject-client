async function getAllMovies() {
  const response = await fetch(`http://localhost:3100/movies`);
  const resolve = await response.json();
  return resolve;
}

async function getMovieDetails(id) {
  const response = await fetch(`http://localhost:3100/movies/${id}`);
  const resolve = await response.json();
  console.log("koko", resolve[0][0]);
  return resolve;
}

async function getMovieImage(id) {
  const response = await fetch(`http://localhost:3100/images/${id}`);
  const resolve = await response.json();
  console.log("BIBIIIIIIII", resolve);
  return resolve;
}

async function getMovieReviews(id) {
  const response = await fetch(`http://localhost:3100/reviews/movie/${id}`);
  const resolve = await response.json();
  console.log("HIIIIIIIIIIIIIIIIIII", resolve);
  return resolve;
}
async function ifMovieExists(movieName) {
  const response = await fetch(
    `http://localhost:3100/movies/movieName/${movieName}`
  );
  const resolve = await response.json();
  return resolve;
}
async function getAllGenres() {
  const response = await fetch(`http://localhost:3100/genres`);
  const resolve = await response.json();
  return resolve;
}
async function getAllMoviesOfGenre(genreId) {
  const response = await fetch(`http://localhost:3100/genres/${genreId}`);
  const resolve = await response.json();
  return resolve;
}
async function getUserFavorites(userId) {
  const response = await fetch(
    `http://localhost:3100/genres/userFavorites/${userId}`
  );
  const resolve = await response.json();
  return resolve;
}
async function getReviewById(reviewId) {
  const response = await fetch(
    `http://localhost:3100/reviews/user/${reviewId}`
  );
  const resolve = await response.json();
  return resolve;
}


// async function getAllUserReviews(userId) {
//   const response = await fetch(
//     `http://localhost:3100/reviews/users/${userId}`
//   );
//   const resolve = await response.json();
//   return resolve;
// }



async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function putData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function deleteData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
 
export {
  getAllMovies,
  getMovieDetails,
  getMovieImage,
  getMovieReviews,
  ifMovieExists,
  getAllGenres,
  getAllMoviesOfGenre,
  getUserFavorites,
  postData,
  putData,
  getReviewById,
  deleteData
};
