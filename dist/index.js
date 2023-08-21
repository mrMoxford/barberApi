"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_SECRETKEY)
    .then(() => console.log("DB connection successful!"))
    .then(() => {
    app.listen(Port || 8000, () => {
        console.log(`[server]: Server is running at http://localhost:${Port}`);
    });
})
    .catch(err => console.log(err));
//middlewares
app.use(body_parser_1.default.json());
const Port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
