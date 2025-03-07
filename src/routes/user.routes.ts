import { Router, Request, Response } from 'express'
import { User } from '../types/user'
import { v4 as uuidv4 } from 'uuid'

const userRouter = Router()

const users: User[] = []

/**
 * Get users
 * 
 * @route GET /users
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with users list object.
 */
userRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(users)
})

/**
 * Get user by ID
 * 
 * @route GET /users/:id
 * @param {Request} req - Express request containing user ID.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with user matching ID.
 */
userRouter.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const user = users.find(user => user.id === id)
  if (!user) {
    res.status(404).send("User not found")
    return
  }
  res.status(200).json(user)
})

/**
 * Adds a new user to the system.
 *
 * @route POST /users
 * @param {Request<{}, {}, Omit<User, 'id'>>} req - Express request containing the user data in the body.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with the newly created user.
 */
userRouter.post("/", (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const newUser: User = {
    id: uuidv4(),
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  users.push(newUser)
  res.status(201).json(newUser)
})

/**
 * Updates a user by ID.
 *
 * @route PUT /users/:id
 * @param {Request<{ id: string }, {}, Partial<User>>} req - Express request containing the user ID in params and the update fields in the body.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with the updated user or an error if not found.
 */
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


/**
 * Deletes a user by ID.
 * 
 * @route DELETE /users/:id
 * @param {Request<{ id: string }>} req - Express request containing user id.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with a message that user was deleted.
 */
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

/**
 * Search users by firstname.
 * 
 * @route GET /users/search/:firstname
 * @param {Request<{ firstname: string }>} req - Express request containing firstname.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with user object.
 */
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