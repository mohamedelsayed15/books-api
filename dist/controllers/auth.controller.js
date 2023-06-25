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
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const logger_service_1 = __importDefault(require("../services/logger.service"));
const log = new logger_service_1.default("store.controller");
//===================================
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //replace with validation
        if (!req.body.email || !req.body.password) {
            return res.status(422).send({
                error: "validation error"
            });
        }
        const user = yield user_model_1.default.findByEmail(req.body.email);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                error: "couldn't find the specified user"
            });
        }
        //replace with bcrypt compare
        if (req.body.password !== user.password) {
            return res.status(404).json({
                error: "couldn't find the specified user"
            });
        }
        user.password = '';
        const token = yield jsonwebtoken_1.default.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({
            user, token
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
