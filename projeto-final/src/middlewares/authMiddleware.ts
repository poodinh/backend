import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "";

export function checkRole(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token was provided." });
    }
    try {
      const decodedToken: any = jwt.verify(token, SECRET_KEY);
      if (!roles.includes(decodedToken.role)) {
        res.status(403).json({
          error: "Access fobidden. User doesn't have the required role",
        });
      } else {
        next();
      }
    } catch (error) {
      return res
        .status(403)
        .json({ error: "Access forbidden. Invalid or expired token." });
    }
  };
}


export function checkID(id: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1] as string;
    try {
      const decodedToken: any = jwt.verify(token, SECRET_KEY);
      console.log(decodedToken)
      if (!id.includes(decodedToken.id)) {
        res.status(403).json({
          error: "Action fobidden. ID doesn't match this user ID",
        });
      } else {
        next();
      }
    } catch (error) {
      return res
        .status(403)
        .json({ error: "Access forbidden. Invalid or expired token." });
    }
  };
}