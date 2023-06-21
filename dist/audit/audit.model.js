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
class Audit {
    constructor(options) {
        const { auditAction, data, status, error, auditBy, auditOn } = options;
        this.auditAction = auditAction;
        this.data = data;
        this.status = status;
        this.error = error;
        this.auditBy = auditBy;
        this.auditOn = auditOn;
    }
    static create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let { auditAction, data, status, error, auditBy, auditOn } = options;
            if (data) {
                data = JSON.stringify(data);
            }
            if (error) {
                error = JSON.stringify(error);
            }
            new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, connection_1.query)(queries_1.auditQuery.ADD_AUDIT, [
                        auditAction,
                        data,
                        status,
                        error,
                        auditBy,
                        auditOn
                    ]);
                    resolve(options);
                }
                catch (e) {
                    reject(e);
                }
            }));
        });
    }
}
exports.default = Audit;
