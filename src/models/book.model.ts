import { query } from "../db/connection"
import { bookQuery } from "../db/queries"

export default class Book {
    id: any;
    title: any;
    description: any;
    isbn: any;
    author: any;
    publisher: any;
    pages: any;
    storeCode: any;
    constructor(options:any) {
        const {
            id,
            title,
            description,
            isbn,
            author,
            publisher,
            pages,
            storeCode
        } = options;
    this.id = id
    this.title = title
    this.description = description
    this.isbn = isbn
    this.author = author
    this.publisher = publisher
    this.pages = pages
    this.storeCode = storeCode
    }
    
    //=============== Functions ===============
    // add a new book
    static async create(options: any) {
        const {
            title,
            description,
            isbn,
            author,
            publisher,
            pages,
            storeCode
        } = options;
        return new Promise(async (resolve, reject) => {
            try {
                // implement query
                const book :any= await query(bookQuery.ADD_BOOK, [
                    title,
                    description,
                    isbn,
                    author,
                    publisher,
                    pages,
                    storeCode
                ]);
                resolve(book.rows[0])
            } catch (e) {
                reject(e)
            }
        })
    }
    static async updateBook(options: any) {
        const {
            bookId,
            title,
            description,
            isbn,
            author,
            publisher,
            pages,
            storeCode
        } = options;
        return new Promise(async (resolve, reject) => {
            try {
                // implement query
                const book:any = await query(bookQuery.UPDATE_BOOK, [
                    title,
                    description,
                    isbn,
                    author,
                    publisher,
                    pages,
                    storeCode,
                    bookId
                ]);
                resolve(book.rows[0])
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
    static async findById(id:number) {
        return new Promise(async (resolve, reject) => {
            try {
                const book:any = await query(bookQuery.GET_BOOK_DETAILS, [id]);

                resolve(book.rows[0])
            } catch (e) {
                reject(e)
            }
        })
    }
    static async count(id:number) {
        return new Promise(async (resolve, reject) => {
            try {
                const book:any = await query(bookQuery.count, [id]);

                resolve(book.rows.length)
            } catch (e) {
                reject(e)
            }
        })
    }
    async deleteBookById() {
        return new Promise(async (resolve, reject) => {
            try {
                const book:any = await query(bookQuery.DELETE_BOOK, [this.id]);

                resolve("deleted")
            } catch (e) {
                reject(e)
            }
        })
    }
}
