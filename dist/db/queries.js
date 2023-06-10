"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeQuery = void 0;
exports.storeQuery = {
    GET_STORE_LIST: `SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE`,
    ADD_STORE: `INSERT INTO bms.store (store_name, store_address, store_code) VALUES('', '', '');`
};
