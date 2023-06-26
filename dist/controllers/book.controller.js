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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = __importDefault(require("../models/book.model"));
const multer_book_1 = require("../util/multer-book");
const fs_1 = __importDefault(require("fs"));
const logger_service_1 = __importDefault(require("../services/logger.service"));
const log = new logger_service_1.default("store.controller");
//===================================
exports.getBooksList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query);
        let booksList = yield book_model_1.default.getBooks();
        res.status(200).json({ booksList });
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('getBooksList', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getBookDetails',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.getBookDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield book_model_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                error: "couldn't find specified book"
            });
        }
        res.status(200).json(book);
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('getBookDetails', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getBookDetails',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield book_model_1.default.count(req.params.id);
        if (count < 1) {
            return res.status(404).json({
                error: "couldn't find book"
            });
        }
        let book = yield book_model_1.default.findById(req.params.id);
        let bookObj = new book_model_1.default({
            id: book.book_id
        });
        let deletedBook = yield bookObj.deleteBookById();
        res.status(200).json(deletedBook);
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('deleteBook', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'deleteBook',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try { //replace with validation
        if (!req.body.title ||
            !req.body.description ||
            !req.body.isbn ||
            !req.body.author ||
            !req.body.publisher ||
            !req.body.pages) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            });
        }
        const book = yield book_model_1.default.create({
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages: req.body.pages,
            storeCode: req.body.storeCode
        });
        res.status(201).json(book);
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('addBook', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'addBook',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //replace with validation
        if (!req.body.bookId ||
            !req.body.title ||
            !req.body.description ||
            !req.body.isbn ||
            !req.body.author ||
            !req.body.publisher ||
            !req.body.pages) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            });
        }
        const count = yield book_model_1.default.count(req.body.bookId);
        if (count < 1) {
            return res.status(404).json({
                error: "couldn't find book"
            });
        }
        const book = yield book_model_1.default.updateBook({
            bookId: req.body.bookId,
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages: req.body.pages,
            storeCode: req.body.storeCode
        });
        res.status(201).json({ book });
    }
    catch (err) {
        console.error(err);
        const error = new Error(err.message);
        log.error('updateBook', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'updateBook',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.bookImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        if (!bookId) {
            return res.status(422).send();
        }
        // find the book first
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({
                error: "couldn't find the book"
            });
        }
        const directoryPath = 'images/book-image/' + `${book.book_id}`;
        // creating a directory for the product
        yield fs_1.default.promises.mkdir(directoryPath);
        const upload = (0, multer_book_1.bookUpload)(directoryPath);
        upload(req, res, next => {
            //save into database
            console.log(req.file.path);
        });
        res.send({
            message: "book image uploaded"
        });
    }
    catch (err) {
        console.error(err);
        const error = new Error(err.message);
        log.error('updateBook', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'updateBook',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
