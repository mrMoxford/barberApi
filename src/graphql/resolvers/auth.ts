import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { Types } from "mongoose";
import {User} from "../../mongooseModels/user"
import { userTransformer } from "./merge";


interface userArgs {
    userInput: {
      email: string,
      password: string,
      createdEvents: (Types.ObjectId)[],
    }
    
  }
  interface loginArgs {
    email: string,
    password: string
  }
const userResolver = {
        users: async()=> { 
          try {
            const findUsers: (object)[] = await User.find()
            return findUsers.map((user: any) => {
              return userTransformer(user)
            })
            
          }
          catch(err) {
            throw err
          }
          },
        createUser:async(args: userArgs)=> {
            try{
              console.log("hello")
              const newUser= await User.findOne({email: args.userInput.email})
              if(newUser){
                throw new Error("User email already exists")
              }
            
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });
            const userDetails = await user.save()
            
              return userTransformer(userDetails)}
            catch (err){
              console.log(err)
              throw err
            }},
          login: async({email, password}: loginArgs)=>{
            const user = await User.findOne({email: email})
            if(!user){
              throw new Error("incorrect email credentials")
            }
           const isMatched = await bcrypt.compare(password, user.password)
           if(!isMatched){
            throw new Error("incorrect password credentials")
           }
           const token = jwt.sign({userID: user.id, email: user.email}, process.env.JWT_SECRETKEY, {
            expiresIn: "1h"
           })
           return {userID: user.id, token, tokenExpiry:1}
          }
}
    export default userResolver