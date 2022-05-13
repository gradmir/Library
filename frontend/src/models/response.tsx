import Book from "./book";

export default class BookResponse {
    public Status: boolean;
    public Data: Book | Array<Book> | null;
    public Messages: string;
    public Exception: string;

    constructor(status: boolean, data: Array<Book> | null, mess: string, exception: string) {
        this.Status = status;
        this.Data = data;
        this.Messages = mess;
        this.Exception = exception;
    }

}