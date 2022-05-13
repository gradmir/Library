import BookResponse from "../models/response";
import axios from "axios";
import Book from "../models/book";


export default class BookService {
    private static APIurl: string = "https://localhost:5001/api/books/";


    public static async getAll(): Promise<BookResponse> {
        let res = await axios.get<Array<Book>>(this.APIurl)
            .then((response: any) => {
                const result = response.data;
                return new BookResponse(true, result as Array<Book>, "Success", "");
            })
            .catch(function (error) {
                return new BookResponse(false, null, "Error", error);
            });
        return res;
    }

    public static get(param: any): Promise<BookResponse> {
        let res = axios.get<Book>(this.APIurl + param)
            .then((response: any) => {
                const result = response.data;
                return new BookResponse(true, result , "Success", "");
            })
            .catch(function (error) {
                return new BookResponse(false, null, "Error", error);
            });
        return res;
    }

    public static delete(param: Array<number>): Promise<BookResponse> {
        console.log(param);
        
        let res = axios.delete(this.APIurl, { data: param})
            .then(response => { 
                return new BookResponse(true, null , "Success", "");
            })
            .catch(function (error) {
                return new BookResponse(false, null, "Error", error);
            });
        return res;
    }

    public static create(book: Book): Promise<BookResponse> {

        let res = axios.post(this.APIurl, book)
            .then(response => {
                const result = response.data;
                return new BookResponse(true, result.data , "Success", "");
            })
            .catch(function (error) {
                return new BookResponse(false, null, "Error", error);
            });
        return res;
    }
    public static update(id: string, book: Book): Promise<BookResponse> {

        let res = axios.put(this.APIurl + id, book)
            .then(response => {
                return new BookResponse(true, null , "Success", "");
            })
            .catch(function (error) {
                return new BookResponse(false, null, "Error", error);;
            });
        return res;
    }
}