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
exports.prepareAudit = void 0;
const node_events_1 = require("node:events");
const audit_model_1 = __importDefault(require("./audit.model"));
const eventEmitter = new node_events_1.EventEmitter();
eventEmitter.on(`audit`, (audit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        audit_model_1.default.create(audit);
    }
    catch (e) {
        console.log(e);
    }
}));
const prepareAudit = (options) => {
    const audit = new audit_model_1.default(options);
    eventEmitter.emit('audit', audit);
};
exports.prepareAudit = prepareAudit;
