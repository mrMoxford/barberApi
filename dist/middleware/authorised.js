"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuth = (req, res, next) => {
    const authHeader = req.get("authorized");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }
    let authorisedToken;
    try {
        authorisedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETKEY);
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!authorisedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userID = authorisedToken.userID;
    return next();
};
exports.isAuth = isAuth;
