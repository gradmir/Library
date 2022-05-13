import * as React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import Book from "../models/book";

interface IProps {
  book: Book;
  validated: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BookForm: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className="main-form">
      <Form onSubmit={props.onSubmit} noValidate validated={props.validated}>
        <Form.Group controlId="name" as={Row}>
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className="input-control"
              type="text"
              name="Name"
              value={props.book.Name}
              placeholder="Enter name of the book"
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="year" as={Row}>
          <Form.Label column sm="2">
            Year
          </Form.Label>
          <Col sm="4">
            <Form.Control
              required
              className="input-control"
              type="number"
              name="Year"
              value={props.book.Year}
              placeholder="Enter year"
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid year.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="genre" as={Row}>
          <Form.Label column sm="2">
            Genre
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className="input-control"
              type="text"
              name="Genre"
              value={props.book.Genre}
              placeholder="Enter genre of the book"
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid genre.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group controlId="author" as={Row}>
          <Form.Label column sm="2">
            Author
          </Form.Label>
          <Col sm="10">
            <Form.Control
              required
              className="input-control"
              type="text"
              name="Author"
              value={props.book.Author}
              placeholder="Enter author of the book"
              onChange={props.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid author.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
