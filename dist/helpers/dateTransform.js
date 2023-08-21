"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTransformer = void 0;
const dateTransformer = (dateString) => {
    return new Date(dateString).toISOString();
};
exports.dateTransformer = dateTransformer;
