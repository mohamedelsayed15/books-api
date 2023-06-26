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
const csv = require('fast-csv');
const fs_1 = __importDefault(require("fs"));
const logger_service_1 = __importDefault(require("../services/logger.service"));
const log = new logger_service_1.default("store.controller");
const book_model_1 = __importDefault(require("../models/book.model"));
//===================================
const controller = {};
controller.books = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let booksList = yield book_model_1.default.getBooks();
        const ws = fs_1.default.createWriteStream("books.csv");
        const data = JSON.parse(JSON.stringify(booksList));
        csv.write(data, { headers: true })
            .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            res.download('books.csv', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("downloaded");
                    yield fs_1.default.promises.unlink('books.csv');
                });
            });
        })).pipe(ws);
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('export', error.toString());
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
exports.default = controller;
