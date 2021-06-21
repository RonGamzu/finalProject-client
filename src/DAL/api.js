const movies = [
    {
        name: 'Superman',
        synopsis: 'A very good movie!',
        genre: 'Action',
        imgSrc: 'https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg'
    },
    {
        name: 'Wonder Woman',
        synopsis: 'Classic movie!',
        genre: 'Drama',
        imgSrc: 'https://www.booknet.co.il/Images/Site/Products/9781524770983.jpg'
    },
    {
        name: 'Spiderman',
        synopsis: 'Like it!',
        genre: 'Romantic',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/en/0/02/The_Amazing_Spider-Man_theatrical_poster.jpeg'
    },
    {
        name: 'Ant-Man',
        synopsis: 'Funny!',
        genre: 'Comedy',
        imgSrc: 'https://upload.wikimedia.org/wikipedia/he/thumb/7/75/Ant-Man_poster.jpg/250px-Ant-Man_poster.jpg'
    },
    {
        name: 'Avengers ',
        synopsis: 'Funny!',
        genre: 'Action',
        imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._AC_SL1500_.jpg'
    }
]

const getMovies = () => {
    return movies;
}

export {getMovies}