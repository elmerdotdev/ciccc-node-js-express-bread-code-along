import { Router, Request, Response } from 'express'
import { User } from '../types/user'
import { v4 as uuidv4 } from 'uuid'

const userRouter = Router()

const users: User[] = [
  { id: 'hkjo32ir3ur903', firstname: "John", lastname: "Smith" },
  { id: 'joiflfpofiefwf', firstname: "Jane", lastname: "Doe" }
]

// Get users   http://localhost:3500/users - Browse
userRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(users)
})

// Get user by id    http://localhost:3500/users/1 - Read
userRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)
  if (!user) {
    res.status(404).send("User not found")
    return
  }
  res.status(200).json(user)
})

// Add user      http://localhost:3500/users - Add
userRouter.post("/", (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const newUser: User = {
    id: uuidv4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

// Update user by id      http://localhost:3500/users/1 - Edit
userRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
  const { id } = req.params
  const foundIndex = users.findIndex(user => user.id === id)
  if (foundIndex === -1) {
    res.status(404).send("User not found")
    return
  }
  const updatedUser: User = {
    ...users[foundIndex], // Copy over all properties
    firstname: req.body.firstname ?? users[foundIndex].firstname,
    lastname: req.body.lastname ?? users[foundIndex].lastname
  }
  users[foundIndex] = updatedUser
  res.status(200).json(updatedUser)
})

// Delete user by id    http://localhost:3500/users/1 - Delete
userRouter.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const foundIndex = users.findIndex(user => user.id === id)
  if (foundIndex === -1) {
    res.status(404).send("User not found")
    return
  }
  users.splice(foundIndex, 1)
  res.status(200).send("User was deleted!")
})

// Search user by firstname     http://localhost:3500/users/search/john
userRouter.get('/search/:firstname', (req: Request<{ firstname: string }>, res: Response) => {
  const { firstname } = req.params
  const foundUsers = users.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()))
  if (foundUsers.length === 0) {
    res.status(404).send("No matching users!")
    return
  }
  res.status(200).json(foundUsers)
})

export default userRouter