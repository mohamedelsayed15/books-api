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
const logger_service_1 = __importDefault(require("../services/logger.service"));
const log = new logger_service_1.default("store.controller");
//===================================
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try { //replace with validation
        if (!req.body.username ||
            !req.body.email ||
            !req.body.password) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            });
        }
        const findUser = yield user_model_1.default.findByEmail(req.body.email);
        if (findUser) {
            console.log('user : ', findUser);
            return res.status(409).json({
                error: "a user with this email already signed up"
            });
        }
        //hash the password before saving
        const user = yield user_model_1.default.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            userType: 'customer'
        });
        res.status(201).json(user);
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
exports.getUsersList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usersList = yield user_model_1.default.getUsersList();
        res.status(200).json({ usersList });
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('getUsersList', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getUsersList',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.findUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try { //replace with validation
        let user = yield user_model_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: "couldn't find specified book"
            });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('findUserById', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'findUserById',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.userPic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(422).json({
                error: "Please, Provide a photo"
            });
        }
        // store the file into the database
        console.log(req.file.path);
        res.send('uploaded');
    }
    catch (err) {
        console.error('An error occurred', err);
        const error = new Error(err.message);
        log.error('findUserById', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'findUserById',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
