"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pool_1 = __importDefault(require("./pool"));
const query = (queryText, queryParams) => {
    return new Promise((resolve, reject) => {
        pool_1.default.query(queryText, queryParams)
            .then(res => {
            resolve(res);
        })
            .catch(err => {
            reject(err);
        });
    });
};
exports.query = query;
