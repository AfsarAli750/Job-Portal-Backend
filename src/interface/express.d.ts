import { ITokenPayload } from "./TokenPayload.interface"

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload
    }
  }
}