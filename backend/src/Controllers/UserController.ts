import {Request, Response} from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel";
import {IUser} from "../types/user";
import 'dotenv/config';
import { env } from 'node:process';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  // @ts-ignore
  const saltRounds: number = parseInt(process.env.SALT_ROUNDS) | 10;
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  try {
    const newUser = new UserModel({email, password: hashedPassword});
    const response = await newUser.save();
    const {password, ...rest} = response;
    res.status(201).json({ message: "User created", user: rest });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as {email: string, password: string};
  try {
    const user = await UserModel.findOne<IUser>({email});
    if (!user) res.status(401).json({message: "Invalid User"})
    else {
      const result = await bcrypt.compare(password, user.password);
        if (!result) res.status(401).json({message: "Invalid Credentials"})
        else {
            const token: string = jwt.sign({_id: user._id, email},
                env.JWT_SECRET,
                {expiresIn: '1h'})
            res.cookie('token', token, {httpOnly: true});
            const {password, ...rest} = user;
            res.status(200).json({message: "Login Successful", user: rest});
        }
    }
  } catch (e) {
    res.status(500).json({message: (e as Error).message})
  }
};

export const otp = (req: Request, res: Response) => {
  res.end();
};

export const logout = (req: Request, res: Response) => {
  res.end();
};
