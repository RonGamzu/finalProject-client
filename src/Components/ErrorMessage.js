import { Container, Card, Button, Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";

function ErrorMessage({ message }) {
  return (
    <>
    <div style={{color: 'red'}}>{message}</div>
    </>
  );
}

export default ErrorMessage;
