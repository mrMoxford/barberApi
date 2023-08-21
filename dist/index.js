"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_graphql_1 = require("express-graphql");
const schemas_1 = require("./graphql/schemas");
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const authorised_1 = require("./middleware/authorised");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(authorised_1.isAuth);
app.use("/api", (0, express_graphql_1.graphqlHTTP)({
    schema: schemas_1.graphqlSchema,
    rootValue: resolvers_1.default,
    graphiql: true
}));
mongoose_1.default.connect(process.env.MONGO_SECRETKEY)
    .then(() => console.log("DB connection successful!"))
    .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Api is running!");
    });
})
    .catch(err => console.log(err));
