"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rateLimit = require('express-rate-limit');
// limiting 100 requests every 30 mins
const limiter = rateLimit({
    windowsMs: 1800000,
    max: 100
});
exports.default = limiter;
