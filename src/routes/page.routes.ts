import { Router, Request, Response } from "express";

const pageRouter = Router()

// Home
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the homepage")
})

// About
pageRouter.get("/about", (req: Request, res: Response) => {
  res.status(200).send("<h1>About Us</h1>")
})

// Admin
pageRouter.get("/admin", (req: Request, res: Response) => {
  res.status(401).send("You are not allowed to access this page!")
})

export default pageRouter