"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_route_1 = __importDefault(require("./routes/store.route"));
const book_route_1 = __importDefault(require("./routes/book.route"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const audit_service_1 = require("./audit/audit.service");
const swaggerDocument = require('../swagger.json');
const app = (0, express_1.default)();
const hpp = require('hpp');
const helmet = require('helmet');
require('dotenv').config();
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:5555',
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}));
app.use(helmet());
app.use(express_1.default.json({ limit: "3kb" })); //parser//json data size limitation
app.use(hpp()); //http parameter pollution
//swagger endpoint
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
//routes
app.use('/store', store_route_1.default);
app.use('/book', book_route_1.default);
//404
app.use('/*', (req, res, next) => {
    return res.status(404).json({
        error: "couldn't find the specified route"
    });
});
//error handler 500
app.use((error, req, res, next) => {
    try {
        if (error.prepareAudit) {
            (0, audit_service_1.prepareAudit)(error.prepareAudit);
        }
        return res.status(500).json({
            error: "some error occurred, Please contact support"
        });
    }
    catch (e) {
        console.log(e);
    }
});
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});
module.exports = app;
