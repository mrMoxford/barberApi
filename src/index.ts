import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const app = express()
mongoose
  .connect(process.env.MONGO_SECRETKEY)
  .then(() => console.log("DB connection successful!"))
  .then(()=>{
    app.listen(Port || 8000, ()=>{
        console.log(`[server]: Server is running at http://localhost:${Port}`)
    })
  })
  .catch(err => console.log(err));
//middlewares
app.use(bodyParser.json());
const Port = process.env.PORT
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });



