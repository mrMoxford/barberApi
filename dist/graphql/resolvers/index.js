"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("./events"));
const auth_1 = __importDefault(require("./auth"));
const booking_1 = __importDefault(require("./booking"));
const graphqlResolvers = () => {
    return Object.assign(Object.assign(Object.assign({}, events_1.default), auth_1.default), booking_1.default);
};
exports.default = graphqlResolvers;
