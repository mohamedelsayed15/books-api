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
exports.getBooksList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let booksList = yield book_model_1.default.getBooks();
        res.status(200).send({ booksList });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
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
            return res.status(422).send({
                error: "Either storeName or address are required"
            });
        }
        const book = yield book_model_1.default.create({
            title: req.body.title,
            description: req.body.description,
            isbn: req.body.isbn,
            author: req.body.author,
            publisher: req.body.publisher,
            pages: req.body.pages
        });
        res.status(201).send({ book });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        });
    }
});
