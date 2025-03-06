import { Request, Response, NextFunction } from 'express'

// Blacklisted IPs
const blacklistIP = ['129.212.43.11', '352.62.72.1', '636.27.14.1']

export function auth (req: Request, res: Response, next: NextFunction) {
  console.log(`${req.ip} is visiting the server`)
  if (blacklistIP.includes(req.ip ?? '')) {
    res.status(403).send("Be gone hacker!")
    return
  }
  next() // Proceed to routes or next middleware
}