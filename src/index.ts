import express, { Express, Request, Response } from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const app = express()

const Port = process.env.PORT
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });



app.listen(Port || 8000, ()=>{
    console.log(`[server]: Server is running at http://localhost:${Port}`)
})