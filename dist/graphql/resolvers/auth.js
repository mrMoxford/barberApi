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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../mongooseModels/user");
const merge_1 = require("./merge");
const userResolver = {
    users: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findUsers = yield user_1.User.find();
            return findUsers.map((user) => {
                return (0, merge_1.userTransformer)(user);
            });
        }
        catch (err) {
            throw err;
        }
    }),
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hello");
            const newUser = yield user_1.User.findOne({ email: args.userInput.email });
            if (newUser) {
                throw new Error("User email already exists");
            }
            const hashedPassword = yield bcrypt_1.default.hash(args.userInput.password, 12);
            const user = new user_1.User({
                email: args.userInput.email,
                password: hashedPassword,
            });
            const userDetails = yield user.save();
            return (0, merge_1.userTransformer)(userDetails);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }),
    login: ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.User.findOne({ email: email });
        if (!user) {
            throw new Error("incorrect email credentials");
        }
        const isMatched = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatched) {
            throw new Error("incorrect password credentials");
        }
        const token = jsonwebtoken_1.default.sign({ userID: user.id, email: user.email }, process.env.JWT_SECRETKEY, {
            expiresIn: "1h"
        });
        return { userID: user.id, token, tokenExpiry: 1 };
    })
};
exports.default = userResolver;
