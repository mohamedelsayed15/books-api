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
        const { id, username, email, password, active, tokens, type } = options;
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.active = active;
        this.tokens = tokens;
        this.type = type;
    }
    //=============== Functions ===============
    // add a new user
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, userType } = options;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // implement query
                    const user = yield (0, connection_1.query)(queries_1.userQuery.createUser, [
                        username,
                        password,
                        email,
                        userType
                    ]);
                    resolve(user.rows[0]);
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
                    const user = yield (0, connection_1.query)(queries_1.userQuery.findUserById, [id]);
                    resolve(user.rows[0]);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const user = yield (0, connection_1.query)(queries_1.userQuery.findUserByEmail, [email]);
                    resolve(user.rows[0]);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    // fetching users list
    static getUsersList() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const books = yield (0, connection_1.query)(queries_1.userQuery.getUsersList, null);
                    resolve(books.rows);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.default = Book;
