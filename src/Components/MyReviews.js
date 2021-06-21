import { Button, Container, Table } from "react-bootstrap";
import {AiTwotoneEdit, AiOutlineDelete} from 'react-icons/ai'


export default function MyReviews(params) {
  return (
    <Container className='mt-5'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Movie Name</th>
            <th>Post Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
