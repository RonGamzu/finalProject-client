import { Accordion, Container, Card } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
export default function ReviewPage(params) {
  return (
    <Container className="mb-4 mt-4">
      <div className="d-flex flex-md-row flex-column ">
        <iframe
          src="https://www.youtube.com/embed/Y-_XAt1OFNI"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
          height="300px"
        />
        <div className="text-center">
          <h2 style={{ color: "orange" }}>Movie Name</h2>
          <p style={{ color: "white" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <img
          style={{height: 'auto', width: '200px'}}
          className='d-none d-md-block'
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/%D7%97%D7%A0%D7%9F_%D7%91%D7%9F_%D7%90%D7%A8%D7%99_-_%D7%92%D7%99%D7%90_%D7%9B%D7%95%D7%A9%D7%99_%D7%95%D7%99%D7%A8%D7%99%D7%91_%D7%A4%D7%99%D7%99%D7%9F.jpg"
        ></img>
      </div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle
            className="d-flex justify-content-between"
            as={Card.Header}
            eventKey="0"
          >
            <div>
              Great movie!
              
            </div>
            <div>
              {[1, 1, 1, 1, 1].map(() => (
                <BsFillStarFill />
              ))}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body><p>from ETL <br/> post on 13/7/20</p><br/>The best movie in the world!</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle className="d-flex justify-content-between" as={Card.Header} eventKey="1">
            Bad movie! <BsFillStarFill />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body><p>from Ron Ganzu <br/> post on 13/7/20</p><br/>The baddest movie in the world!</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle className="d-flex justify-content-between" as={Card.Header} eventKey="2">
            Nice Movie!
            <div>
            {[1, 1, 1].map(() => (
              <BsFillStarFill />
            ))}
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body><p>from Shay <br/> post on 13/7/20</p><br/>Just a movie</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
}
