import * as React from "react";
import BookService from "../service/book.service";
import Book from "../models/book";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";
import BookForm from "./bookForm";

interface IProps {
  navigate: NavigateFunction;
  params: any;
}
interface IState {
  book: Book;
  validated: boolean;
}

class EditBookComponent extends React.Component<IProps, IState> {
  public state: IState = {
    book: {
      Id: 0,
      Name: "",
      Year: 0,
      Author: "",
      Genre: "",
    },
    validated: false,
  };
  constructor(props: IProps) {
    super(props);
    BookService.get(this.id(this.props.params)).then((rp) => {
      if (rp.Status) {
        if (!!rp.Data) {
          const book: Book = rp.Data as Book;
          const nextState: IState = {
            validated: false,
            book: book  
          };
          this.setState(nextState);
        }
      } else {
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
        this.props.navigate("/");
      }
    });
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  private id(params: any): string {
    const { id } = params;
    if (!id) {
      this.props.navigate("/");
    }
    return id;
  }

  private handleOnSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const nextState : IState = {
        ...this.state,
        validated: true
    }
    this.setState(nextState);
    if (!event.currentTarget.checkValidity()){
        return;
    }

    BookService.update(this.id(this.props.params), this.state.book).then((rp: any) => {
      if (rp.Status) {
        this.props.navigate("/");
      } else {
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
      }
    });
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    const nextState: IState = {
      ...this.state,
      book: { ...this.state.book, [name]: value },
    };
    this.setState(nextState);
  };

  public render(): React.ReactNode {
    return (
      <>
        <BookForm
          book={this.state.book}
          validated={this.state.validated}
          handleInputChange={this.handleInputChange}
          onSubmit={this.handleOnSubmit}
        />
      </>
    );
  }
}

function EditBook() {
  let navigate = useNavigate();
  return <EditBookComponent params={useParams()} navigate={navigate} />;
}

export default EditBook;
