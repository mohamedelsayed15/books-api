"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../db/connection");
const queries_1 = require("../db/queries");
class Book {
    constructor(options) {
        const { id, title, description, isbn, author, publisher, pages, storeCode } = options;
        this.id = id;
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.author = author;
        this.publisher = publisher;
        this.pages = pages;
        this.storeCode = storeCode;
    }
    //=============== Functions ===============
    // add a new book
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, isbn, author, publisher, pages, storeCode } = options;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // implement query
                    yield (0, connection_1.query)(queries_1.bookQuery.ADD_BOOK, [
                        title,
                        description,
                        isbn,
                        author,
                        publisher,
                        pages,
                        storeCode
                    ]);
                    resolve(options);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    static updateBook(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { bookId, title, description, isbn, author, publisher, pages, storeCode } = options;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // implement query
                    yield (0, connection_1.query)(queries_1.bookQuery.UPDATE_BOOK, [
                        title,
                        description,
                        isbn,
                        author,
                        publisher,
                        pages,
                        storeCode,
                        bookId
                    ]);
                    resolve(options);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    // fetching books list
    static getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const books = yield (0, connection_1.query)(queries_1.bookQuery.GET_BOOKS_LIST, null);
                    resolve(books.rows);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = yield (0, connection_1.query)(queries_1.bookQuery.GET_BOOK_DETAILS, [id]);
                    resolve(book.rows[0]);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    static count(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = yield (0, connection_1.query)(queries_1.bookQuery.count, [id]);
                    resolve(book.rows.length);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    deleteBookById() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const book = yield (0, connection_1.query)(queries_1.bookQuery.DELETE_BOOK, [this.id]);
                    resolve("deleted");
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.default = Book;
