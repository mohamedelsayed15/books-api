"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookQuery = exports.storeQuery = void 0;
exports.storeQuery = {
    GET_STORE_LIST: `SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE`,
    ADD_STORE: "INSERT INTO bms.store (store_name, store_address, store_code) VALUES($1, $2, $3)"
};
exports.bookQuery = {
    GET_BOOKS_LIST: `SELECT book_id, book_title, book_description, book_isbn, book_author, book_publisher, book_pages FROM bms.book`,
    ADD_BOOK: "INSERT INTO bms.book (book_title, book_description, book_isbn, book_author, book_publisher, book_pages) VALUES($1, $2, $3, $4, $5, $6)"
};
