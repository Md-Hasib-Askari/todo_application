import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {env} from "node:process";

const jwt_token = env.JWT_SECRET as string;
interface jwtPayload {
  email: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const {token} = req.cookies as {token: string}
  jwt.verify(token, jwt_token, (err: any, decoded: any) => {
    console.log(decoded)
    if (err) {
      res.status(401).json({status: "unauthorized"});
    } else {
      const { email }: jwtPayload = decoded as jwtPayload;
      req.headers.email = email;
      next();
    }
  });
};

/*
 jwt-payload: {_id: user._id, email}
*/