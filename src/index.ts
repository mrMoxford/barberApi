import dotenv from "dotenv"
import express from "express"
import bodyParser  from "body-parser"
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from "./graphql/schemas/index";
import mongoose from "mongoose";
import graphqlResolvers from "./graphql/resolvers";
import { isAuth } from "./middleware/authorised";


dotenv.config()
const app = express()
 
app.use(bodyParser.json())


app.use(isAuth)

  


app.use("/api", graphqlHTTP({
schema:graphqlSchema ,
rootValue: graphqlResolvers,
graphiql: true
}))

mongoose.connect(process.env.MONGO_SECRETKEY)
.then(() => console.log("DB connection successful!"))
.then(()=> {app.listen(process.env.PORT || 4000, () => {
  console.log("Api is running!");
});})
.catch(err => console.log(err));




