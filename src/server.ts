import express, { NextFunction, Request, Response } from 'express' // Import express
import dotenv from 'dotenv' // Import dotenv
import { auth } from './middleware/auth.middleware'
import { welcome } from './middleware/welcome.middleware'
import pageRouter from './routes/page.routes'
import todoRouter from './routes/todo.routes'
import userRouter from './routes/user.routes'
dotenv.config()

// Create server
const app = express()

// Middleware
app.use(express.json()) // Allow JSON requests
app.use(auth) // Check IP address
app.use(welcome) // Show welcome message

// Routes
app.use("/todos", todoRouter)
app.use("/users", userRouter)
app.use("/", pageRouter)

// Fallback
app.use((req, res, next) => {
  res.status(404).send("Cannot find what you are looking for :(")
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})