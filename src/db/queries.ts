export const userQuery = {
    removeToken:`UPDATE your_table_name
                SET your_array_column = array_remove(your_array_column, $1)
                WHERE user_id = $2 AND your_array_column @> ARRAY[$1]`,
    createUser: `INSERT INTO bms.app_user
    (username, "password", email, user_type)
    VALUES($1, $2, $3, $4) returning *
    `,
    findUserById: `SELECT * FROM bms.app_user where user_id = $1`,
    getUsersList:  `SELECT * FROM bms.app_user`,
    findUserByEmail:`SELECT user_id, "password"  FROM bms.app_user where Lower(email) = Lower($1)`
}

export const auditQuery = {
    ADD_AUDIT :`INSERT INTO bms.app_audit
    (audit_action, audit_data, audit_status, audit_error, audit_by, audit_on)
    VALUES($1, $2, $3, $4, $5, $6)`
}


export const storeQuery = {

    GET_STORE_LIST: `SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE`,
    
    ADD_STORE: `INSERT INTO bms.store (store_name, store_address, store_code) 
                VALUES($1, $2, $3)`,

}

export const bookQuery = {

    GET_BOOKS_LIST: `SELECT book_id, book_title, book_author, book_publisher 
                    FROM bms.book`,
    
    ADD_BOOK: `INSERT INTO bms.book 
                (book_title, book_description, book_isbn, book_author, book_publisher, book_pages, store_code)
                VALUES($1, $2, $3, $4, $5, $6, $7) returning *`,

    GET_BOOK_DETAILS: `SELECT 
                        book_id, book_title, book_description, book_isbn, 
                        book_author, book_publisher, book_pages, 
                        book.store_code, store.store_name 
                        FROM bms.book 
                        inner join bms.store on book.store_code = store.store_code 
                        where book_id = $1`,

    UPDATE_BOOK:`UPDATE bms.book
                SET book_title=$1, book_description=$2, book_isbn=$3, book_author=$4, 
                book_publisher=$5, book_pages=$6, store_code=$7
                WHERE book_id=$8`,

    DELETE_BOOK:`DELETE FROM bms.book
                WHERE book_id=$1`,

    count:`SELECT book_id FROM bms.book where book_id =$1`
} 
const varr =``