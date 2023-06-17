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
const audit_service_1 = require("../audit/audit.service");
const audit_action_1 = require("../audit/audit.action");
exports.getBooksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let booksList = yield book_model_1.default.getBooks();
        //auditing
        (0, audit_service_1.prepareAudit)({
            auditAction: audit_action_1.auditAction.GET_BOOK_LIST,
            data: booksList,
            status: 200,
            error: null,
            auditBy: "User",
            auditOn: new Date(Date.now()).toLocaleString(),
        });
        res.status(200).json({ booksList });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.getBookDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield book_model_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                error: "couldn't find specified book"
            });
        }
        res.status(200).json(book);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("count");
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
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
});
