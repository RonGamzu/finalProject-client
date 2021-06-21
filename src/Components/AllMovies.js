import { Container, Card, Button } from "react-bootstrap";
import MovieSearch from './MovieSearch'

export default function AllMovies({movies}) {
    
    return(
        <>
        <Container fluid className='mt-4'>
            <h2 style={{color: 'orange'}}>All The Movies</h2>
            <MovieSearch />
            <Container fluid className='d-flex mt-5'>
            {movies.map((movie, index) => {
            return <Card key={index} className="mx-3" style={{ width: "18rem"}}>
            <Card.Img variant="top" src= {movie.imgSrc} style={{height: '200px'}}/>
            <Card.Body>
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>
                { 
                    movie.synopsis
                }
              </Card.Text>
              <Button variant="primary">See review</Button>
            </Card.Body>
          </Card>;   
      })}
            </Container>

        </Container>
        </>
    )
}