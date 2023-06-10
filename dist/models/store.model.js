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
const generateRandomString_1 = require("../util/generateRandomString");
// interface StoreOptions {
//     name: string;
//     address: string;
//     code: string;
// }
class Store {
    // name: string;
    // code: string;
    // address: string;
    // constructor(options: StoreOptions) {
    //     const { name, address } = options;
    //     this.name = name;
    //     this.code = generateStoreCode();
    //     this.address = address;
    //     // this.create().then(store => console.log(store)).catch(e => {
    //     //     throw e
    //     // })
    // }
    //=============== Functions ===============
    // creating a new store
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, address } = options;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // generate store code
                    options.code = (0, generateRandomString_1.generateStoreCode)();
                    // implement query
                    const store = yield (0, connection_1.query)(queries_1.storeQuery.ADD_STORE, [
                        name,
                        address,
                        options.code
                    ]);
                    resolve(options);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
    // fetching store list
    static getStores() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const stores = yield (0, connection_1.query)(queries_1.storeQuery.GET_STORE_LIST, null);
                    resolve(stores);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.default = Store;
