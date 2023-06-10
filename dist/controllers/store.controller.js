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
const queries_1 = require("../db/queries");
const connection_1 = require("../db/connection");
const store_model_1 = __importDefault(require("../models/store.model"));
//const dbConnection = require("../db/connection")
exports.getStoreList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeListQuery = queries_1.storeQuery.GET_STORE_LIST;
        const storeList = yield (0, connection_1.query)(storeListQuery, null);
        res.status(200).send(storeList);
    }
    catch (e) {
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.addStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.storeName || !req.body.address || !req.body.code) {
            return res.status(422).send({
                error: "Either storeName or address are required"
            });
        }
        const store = new store_model_1.default({
            name: req.body.storeName,
            address: req.body.address,
            code: req.body.code
        });
        const addStoreQuery = queries_1.storeQuery.ADD_STORE;
        const storeList = yield (0, connection_1.query)(addStoreQuery, null);
    }
    catch (e) {
    }
});
