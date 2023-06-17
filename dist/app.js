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
const swaggerDocument = require('../swagger.json');
const app = (0, express_1.default)();
require('dotenv').config();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "3kb" })); //parser//json data size limitation
//swagger endpoint
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
//routes
app.use('/store', store_route_1.default);
app.use('/book', book_route_1.default);
app.listen(process.env.PORT, () => {
    console.log(process.env.PORT);
});
module.exports = app;
