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
const store_model_1 = __importDefault(require("../models/store.model"));
const logger_service_1 = __importDefault(require("../services/logger.service"));
const log = new logger_service_1.default("store.controller");
//===================================
exports.addStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.storeName || !req.body.address) {
            return res.status(422).json({
                error: "Either storeName or address are required"
            });
        }
        const store = yield store_model_1.default.create({
            name: req.body.storeName,
            address: req.body.address
        });
        res.status(201).json({ store });
    }
    catch (err) {
        console.error(err);
        const error = new Error(err.message);
        log.error('addStore', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'addStore',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
exports.getStoreList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let storesList = yield store_model_1.default.getStores();
        res.status(200).json({ storesList });
    }
    catch (err) {
        console.error(err);
        const error = new Error(err.message);
        log.error('getStoreList', error.toString());
        // data for auditing handled in error handler in app.ts
        error.prepareAudit = {
            auditAction: 'getStoreList',
            data: null,
            status: 500,
            error: error.toString(),
            auditBy: "internal server error",
            auditOn: new Date(Date.now()).toLocaleString(),
        };
        return next(error);
    }
});
