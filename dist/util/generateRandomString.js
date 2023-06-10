"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStoreCode = void 0;
const randomString = require('randomstring');
const generateStoreCode = () => {
    return randomString.generate({
        length: 5,
        charset: 'alphabetic',
        capitalization: 'uppercase'
    });
};
exports.generateStoreCode = generateStoreCode;
