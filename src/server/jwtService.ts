import jsonwebtoken from "jsonwebtoken";
import { cookieProps, JWT_SECRET } from "./constants";

//Oauth token will be received by the server in this case

export interface IClientData {
  token: string;
}

interface IOptions {
  expiresIn: string;
}
export class JwtService {
  private readonly secret: string;
  private readonly options: IOptions;
  private readonly VALIDATION_ERROR = "JSON-web-token validation failed.";

  constructor() {
    this.secret = JWT_SECRET;
    this.options = { expiresIn: cookieProps.options.maxAge.toString() };
  }

  public getJwt(data: IClientData): Promise<string> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(data, this.secret, this.options, (err, token) => {
        err ? reject(err) : resolve(token || "");
      });
    });
  }

  public decodeJwt(jwt: string): Promise<IClientData> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(jwt, this.secret, (err, decoded) => {
        return err
          ? reject(this.VALIDATION_ERROR)
          : resolve(decoded as IClientData);
      });
    });
  }
}
