"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
const db_config = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 200,
    max: 20,
};
const pool = new pg_1.Pool(db_config);
pool.on('connect', (client) => {
    console.log(('connected'));
});
pool.on('remove', (client) => {
    console.log(('connection removed'));
});
exports.default = pool;
