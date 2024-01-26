import {Request, Response} from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";
import {IUser} from "../types/user";
import 'dotenv/config';
import { env } from 'node:process';
import {decodeToken} from "../Middlewares/AuthVerify";

const jwt_token: string = env.JWT_SECRET as string;
const SALT_ROUNDS: string = env.SALT_ROUNDS as string;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const cookieEmail = req.headers.email as string;
  if (cookieEmail) {
      res.status(200).json({message: "Already Logged In"})
      return;
  }
  const saltRounds: number = parseInt(SALT_ROUNDS) | 10;
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = new UserModel({email, password: hashedPassword});
    const response = await newUser.save();
    const {_doc} = response as any;
    const {password, ...rest} = _doc as any;
    res.status(201).json({ message: "User created"});
  } catch (error: any) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const decodedToken = await decodeToken(req.headers.authorization as string) as {email: string}
  const { email, password } = req.body as {email: string, password: string};
  if (decodedToken && decodedToken.email === email) {
      res.status(200).json({message: "Already Logged In"})
      return;
  }
  try {
    const user = await UserModel.findOne<IUser>({email});
    if (!user) res.status(401).json({message: "Invalid User"})
    else {
      const result = await bcrypt.compare(password, user.password);
        if (!result) res.status(401).json({message: "Invalid Credentials"})
        else {
            const token: string = jwt.sign({email},
                jwt_token,
                {expiresIn: '1h'})
            res.cookie('token', token, {httpOnly: true});
            res.status(200).json({message: "Login Successful", token});
        }
    }
  } catch (e) {
    res.status(500).json({message: (e as Error).message})
  }
};

export const isLoggedIn = async (req: Request, res: Response) => {
    const token = req.cookies.token ? req.cookies.token : req.body.token;
    if (!token) res.status(401).json({message: "Unauthorized"})
    else {
        try {
            const {email}: any = jwt.verify(token, jwt_token);
            const user = await UserModel.findOne({email});
            if (!user) res.status(401).json({message: "Unauthorized"})
            else res.status(200).json({message: "Authorized"})
        } catch (e) {
            res.status(500).json({message: (e as Error).message})
        }
    }
}

export const otp = (req: Request, res: Response) => {
  res.end();
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.status(200).json({message: "Logged Out"});
};

export const changePassword = async (req: Request, res: Response) => {
  const {email} = req.headers as {email: string};
    const {password} = req.body as {password: string};
    const saltRounds: number = parseInt(SALT_ROUNDS) | 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    try {
        const user = await UserModel.findOne({email});
        if (!user) res.status(401).json({message: "Invalid User"})
        else {
            await UserModel.updateOne({email}, {password: hashedPassword});
            res.status(200).json({message: "Password Changed Successfully"});
        }
    } catch (e) {
        res.status(500).json({message: (e as Error).message})
    }
}