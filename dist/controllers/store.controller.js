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
//const dbConnection = require("../db/connection")
exports.getStoreList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const storeListQuery = storeQuery.GET_STORE_LIST
        // const storeList = await query(storeListQuery, null)
        let storeList = yield store_model_1.default.getStores();
        res.status(200).send(storeList.rows);
    }
    catch (e) {
        return res.status(500).send({
            error: "some error occurred, Please contact support"
        });
    }
});
exports.addStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.storeName || !req.body.address) {
            console.log("ssss");
            return res.status(422).send({
                error: "Either storeName or address are required"
            });
        }
        const store = yield store_model_1.default.create({
            name: req.body.storeName,
            address: req.body.address
        });
        res.status(201).send({ store });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ e });
    }
});
