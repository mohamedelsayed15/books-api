import { query } from "../db/connection"
import { bookQuery } from "../db/queries"

export default class Book {
    //=============== Functions ===============
    // add a new book
    static async create(options: any) {
        const {
            title,
            description,
            isbn,
            author,
            publisher,
            pages
        } = options;
        return new Promise(async (resolve, reject) => {
            try {
                // implement query
                await query(bookQuery.ADD_BOOK, [
                    title,
                    description,
                    isbn,
                    author,
                    publisher,
                    pages
                ]);
                resolve(options)
            } catch (e) {
                reject(e)
            }
        })
    }
    // fetching books list
    static async getBooks() {
        return new Promise(async (resolve, reject) => {
            try {
                const books: any = await query(bookQuery.GET_BOOKS_LIST, null);

                resolve(books.rows)
            } catch (e) {
                reject(e)
            }
        })
    }
}
