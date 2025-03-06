import { Router, Request, Response } from 'express'
import { Todo } from '../types/todo'

const todoRouter = Router()

// In-memory database
const todos: Todo[] = [
  { id: 1, task: "Wash laundry", isCompleted: false },
  { id: 2, task: "Feed cat", isCompleted: false }
]

// Get todos /todos
todoRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(todos)
})

export default todoRouter