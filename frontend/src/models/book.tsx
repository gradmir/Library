export default class Book {
    Id?: number;
    Name: string;
    Year: number | undefined;
    Author: string;
    Genre: string;

    constructor(id: number,fullanme: string, year: number, author: string, genre: string) {
        this.Id = id;
        this.Name = fullanme;
        this.Year = year;
        this.Author = author;
        this.Genre = genre;
    } 
}