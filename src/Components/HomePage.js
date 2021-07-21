import TopBox from './TopBox';
import "../CSS/HomePage.css";


function HomePage({ movies }) {

    return(
        <>
        <div className='HomePageBackGround'></div>
    <h2 className='text-center my-3' style={{color: 'orange'}}>New Movies</h2>
    <TopBox movies={movies}/>
        </>
    )
}

export default HomePage