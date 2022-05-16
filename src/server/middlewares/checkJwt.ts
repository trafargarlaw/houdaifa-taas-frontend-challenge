import { Request, Response, NextFunction } from "express";
import { JwtService } from "../jwtService";

const jwtService = new JwtService();
export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = <string>req.cookies.jid;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = await jwtService.decodeJwt(token);
    res.locals.jwtPayload = jwtPayload.token;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return res.status(401).send("Invalid token");
  }
  next();
};
