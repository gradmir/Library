import * as React from "react";
import Book from "../models/book";
import { Button, FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IProps {
  book: Book;
  toggleCheckboxHandler: any;
}

const BookRow: React.FunctionComponent<IProps> = (props: IProps) => {
  let navigate = useNavigate();
  return (
    <>
      <tr>
        <td>
          <FormCheck
            type="checkbox"
            onChange={() => props.toggleCheckboxHandler(props.book.Id)}
          />
        </td>
        <td>{props.book.Name}</td>
        <td>{props.book.Year}</td>
        <td>{props.book.Genre}</td>
        <td>{props.book.Author}</td>
        <td>
          <Button
            variant="primary"
            onClick={() => navigate("/edit/" + props.book.Id)}
          >
            Edit
          </Button>
        </td>
      </tr>
    </>
  );
};

export default BookRow;
