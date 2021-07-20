import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { AiTwotoneEdit, AiOutlineDelete } from "react-icons/ai";
import { useHistory } from "react-router";
import { postData } from "../DAL/api";

export default function MyReviews({ connected, rest }) {
  const [reviews, setReviews] = useState([]);
  let history = useHistory();
  function handleClick(reviewId) {
    history.push(`/editReview/${reviewId}`);
  }
  useEffect(async() => {
    if (connected) {
      console.log('MyReviews: connected[0] ', connected[0]);
      setReviews(await postData("http://localhost:3100/reviews/user",connected[0]));
      console.log('and reviews after:  ', reviews); 
    }
  }, []);
  console.log('reviews::', reviews);
  return (
    <Container className="mt-5">
      {reviews.length > 0 &&
      <Table responsive className='text-center' striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Movie Name</th>
            <th>Post Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {reviews[0].map((review, index) => {
            return(
              <tr>
              <td>{index + 1}</td>
              <td>{review.movie_name}</td>
              <td>{review.post_date.split("T")[0]}</td>
              <td className='text-center'><Button review={review} onClick={()=>handleClick(review.id)}><AiTwotoneEdit /></Button></td>
            </tr>
            )
          })}
          {/* <tr>
            <td>1</td>
            <td>Superman</td>
            <td>17/3/2014</td>
            <td className='text-center'><Button><AiTwotoneEdit /></Button></td>
            <td className='text-center'><Button><AiOutlineDelete /></Button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ant-Man</td>
            <td>21/10/2020</td>
            <td className='text-center'><Button><AiTwotoneEdit /></Button></td>
            <td className='text-center'><Button><AiOutlineDelete /></Button></td>
          </tr> */}
        </tbody>
      </Table>
            }

    </Container>
  );
}
