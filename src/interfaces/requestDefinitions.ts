import { Request } from "express"
export interface IPayload extends Request {
  payload:{
      id:string
  }
}