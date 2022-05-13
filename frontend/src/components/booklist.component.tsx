import * as React from "react";
import BookService from "../service/book.service";
import Book from "../models/book";
import BookRow from "./book.component";
import { Table, Button } from "react-bootstrap";

interface IProps {}
interface IState {
  listBooks: Array<Book>;
  isReady: Boolean;
  hasError: Boolean;
  selectedBooks: Array<number>;
}

class BookList extends React.Component<IProps, IState> {
  public state: IState = {
    listBooks: new Array<Book>(),
    isReady: false,
    hasError: false,
    selectedBooks: new Array<number>()
  };
  constructor(props: IProps) {
    super(props);
    this.toggleCheckboxHandler = this.toggleCheckboxHandler.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
  }

  public componentDidMount() {
    BookService.getAll().then((rp: any) => {
      if (rp.Status) {
        const listBooks = rp.Data;

        this.setState({ listBooks: listBooks });
        this.setState({ isReady: true });
      } else {
        this.setState({ isReady: true });
        this.setState({ hasError: true });
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
      }
    });
  }

  public toggleCheckboxHandler(id: number){
    let newSelectedBooks = new Array<number>();
    if (this.state.selectedBooks.includes(id)){
      newSelectedBooks = this.state.selectedBooks.filter(elem => elem != id)
    } else {
      newSelectedBooks = this.state.selectedBooks.concat(id)
    }
    const nextState: IState = {
      ...this.state,
      selectedBooks: newSelectedBooks
    }
    this.setState(nextState);
  }

  private deleteSelected(){
    BookService.delete(this.state.selectedBooks).then((rp: any) => {
      if (rp.Status) {
        window.location.reload();
      } else {
        console.log("Messages: " + rp.Messages);
        console.log("Exception: " + rp.Exception);
      }
    });
  }

  public list = () => {
    if (!this.state.isReady) {
      return (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }
    if (this.state.hasError) {
      return <p className="message">An error occurred!</p>;
    }

    return this.state.listBooks.length !== 0 ? (
      this.state.listBooks.map((book, i) => {
        return <BookRow key={i} book={book} toggleCheckboxHandler={this.toggleCheckboxHandler} />;
      })
    ) : (
      <p className="message">No books available. Please add some books.</p>
    );
  };

  public render(): React.ReactNode {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.list()}</tbody>
        </Table>
        <Button disabled={this.state.selectedBooks.length === 0} variant="danger" onClick={() => this.deleteSelected()}>
          Delete Selected
        </Button>
      </>
    );
  }
}
export default BookList;
