import TopBox from './TopBox';


function HomePage({ movies }) {

    return(
        <>
    <img src='https://soundshine.co.il/wp-content/uploads/2018/01/popcorn-1085072_1920.jpg' height= '450px' width= '100%' style={{objectFit: 'cover'}} ></img>
    <h2 className='text-center my-3' style={{color: 'orange'}}>New Movies</h2>
    <TopBox movies={movies}/>
        </>
    )
}

export default HomePage