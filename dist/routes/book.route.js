"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookController = require("../controllers/book.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/books-list', bookController.getBooksList);
router.post('/add-book', bookController.addBook);
exports.default = router;
