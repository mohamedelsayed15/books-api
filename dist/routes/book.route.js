"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookController = require("../controllers/book.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/books-list', bookController.getBooksList);
router.get('/book-details/:id', bookController.getBookDetails);
router.delete('/delete-book/:id', bookController.deleteBook);
router.post('/add-book', bookController.addBook);
router.post('/add-book-image/:id', bookController.bookImage);
router.patch('/edit-book', bookController.updateBook);
//404
router.use('/*', (req, res) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
exports.default = router;
