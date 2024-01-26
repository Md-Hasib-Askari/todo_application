import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {env} from "node:process";

const jwt_token = env.JWT_SECRET as string;
interface jwtPayload {
  email: string
}

export const authVerify = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (req.headers.authorization) {
    token = (req.headers.authorization as string).split(" ")[1].split(";")[0].split("=")[1];
  } else {
    token = req.cookies.token as string;
  }
  jwt.verify(token, jwt_token, (err: any, decoded: any) => {
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

export const decodeToken = async (token: string): Promise<jwtPayload | any> => {
  try {
    return await <jwtPayload>jwt.verify(token, jwt_token);
  } catch (e: any) {
    return e;
  }
}