import { Request, Response, NextFunction } from 'express'

export function welcome (req: Request, res: Response, next: NextFunction) {
  console.log("Authentication successful. User is not blocked!")
  next()
}