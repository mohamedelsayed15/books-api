"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookQuery = exports.storeQuery = exports.userQuery = exports.auditQuery = void 0;
exports.auditQuery = {
    ADD_AUDIT: `INSERT INTO bms.app_audit
    (audit_action, audit_data, audit_status, audit_error, audit_by, audit_on)
    VALUES($1, $2, $3, $4, $5, $6)`
};
exports.userQuery = {
    removeToken: `UPDATE your_table_name
                SET your_array_column = array_remove(your_array_column, $1)
                WHERE user_id = $2 AND your_array_column @> ARRAY[$1]`
};
exports.storeQuery = {
    GET_STORE_LIST: `SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE`,
    ADD_STORE: `INSERT INTO bms.store (store_name, store_address, store_code) 
                VALUES($1, $2, $3)`,
};
exports.bookQuery = {
    GET_BOOKS_LIST: `SELECT book_id, book_title, book_author, book_publisher 
                    FROM bms.book`,
    ADD_BOOK: `INSERT INTO bms.book 
                (book_title, book_description, book_isbn, book_author, book_publisher, book_pages, store_code)
                VALUES($1, $2, $3, $4, $5, $6, $7)`,
    GET_BOOK_DETAILS: `SELECT 
                        book_id, book_title, book_description, book_isbn, 
                        book_author, book_publisher, book_pages, 
                        book.store_code, store.store_name 
                        FROM bms.book 
                        inner join bms.store on book.store_code = store.store_code 
                        where book_id = $1`,
    UPDATE_BOOK: `UPDATE bms.book
                SET book_title=$1, book_description=$2, book_isbn=$3, book_author=$4, 
                book_publisher=$5, book_pages=$6, store_code=$7
                WHERE book_id=$8`,
    DELETE_BOOK: `DELETE FROM bms.book
                WHERE book_id=$1`,
    count: `SELECT book_id FROM bms.book where book_id =$1`
};
const varr = ``;
