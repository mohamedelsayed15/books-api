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
exports.createTokens = exports.auth = void 0;
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let headerToken = req.header('Authorization');
        if (!headerToken || !headerToken.startsWith('Bearer ')) {
            return res.status(422).send({
                error: "the request is missing bearer token"
            });
        }
        headerToken = headerToken.substring(7);
        //custom function (promise) 
        const decoded = yield jwtVerify(headerToken);
        req.id = decoded.id;
        next();
    }
    catch (e) {
    }
});
exports.auth = auth;
const createTokens = (user) => {
};
exports.createTokens = createTokens;
const jwtVerify = (headerToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(headerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};
