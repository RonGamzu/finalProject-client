import { Container, Card, Button } from "react-bootstrap";


function GenrePage({genre, movies}) {
    
    return(
        <>
        <Container fluid className='mt-4'>
            <h2 style={{color: 'orange'}}>{genre}</h2>
            <Container fluid className='d-flex mt-5'>
            {movies.map((movie, index) => {
          if (movie.genre === genre) {
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
          }
      })}
            </Container>

        </Container>
        </>
    )
}

export default GenrePage