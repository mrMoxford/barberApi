import { Request,Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export interface IGetUserAuthInfoRequest extends Request {
    isAuth: boolean,
    userID: string
}

export const  isAuth: any = (req:IGetUserAuthInfoRequest ,res: Response, next:NextFunction): void => {
    const authHeader = req.get("authorized")
    if(!authHeader){
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(" ")[1]
    if(!token || token === ""){
        req.isAuth = false
        return next()
    }
    let authorisedToken: any;
    try {
      authorisedToken = jwt.verify(token, process.env.JWT_SECRETKEY)
        
    } catch(err){
        req.isAuth = false
        return next()
    }
    if(!authorisedToken){
        req.isAuth = false
        return next()
    }
    req.isAuth = true
    req.userID = authorisedToken.userID
    return next()
}