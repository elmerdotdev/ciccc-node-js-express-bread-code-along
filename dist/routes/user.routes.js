"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const userRouter = (0, express_1.Router)();
const users = [];
/**
 * Get users
 *
 * @route GET /users
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with users list object.
 */
userRouter.get('/', (req, res) => {
    res.status(200).json(users);
});
/**
* Search users by firstname.
*
* @route GET /users/search?firstname=somevalue
* @query {string} firstname - The firstname to search for.
* @param {Request<{}, {}, {}, { firstname: string }>} req - Express request containing query parameters.
* @param {Response} res - Express response object.
* @returns {void} Responds with an array of matched user objects or an error message.
*/
userRouter.get('/search', (req, res) => {
    const { firstname } = req.query;
    console.log(firstname);
    const foundUsers = users.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (foundUsers.length === 0) {
        res.status(404).send("No matching users!");
        return;
    }
    res.status(200).json(foundUsers);
});
/**
 * Get user by ID
 *
 * @route GET /users/:id
 * @param {Request} req - Express request containing user ID.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with user matching ID.
 */
userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).json(user);
});
/**
 * Adds a new user to the system.
 *
 * @route POST /users
 * @param {Request<{}, {}, Omit<User, 'id'>>} req - Express request containing the user data in the body.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with the newly created user.
 */
userRouter.post("/", (req, res) => {
    const newUser = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
/**
 * Updates a user by ID.
 *
 * @route PUT /users/:id
 * @param {Request<{ id: string }, {}, Partial<User>>} req - Express request containing the user ID in params and the update fields in the body.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with the updated user or an error if not found.
 */
userRouter.put("/:id", (req, res) => {
    var _a, _b;
    const { id } = req.params;
    const foundIndex = users.findIndex(user => user.id === id);
    if (foundIndex === -1) {
        res.status(404).send("User not found");
        return;
    }
    const updatedUser = Object.assign(Object.assign({}, users[foundIndex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : users[foundIndex].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : users[foundIndex].lastname });
    users[foundIndex] = updatedUser;
    res.status(200).json(updatedUser);
});
/**
 * Deletes a user by ID.
 *
 * @route DELETE /users/:id
 * @param {Request<{ id: string }>} req - Express request containing user id.
 * @param {Response} res - Express response object.
 * @returns {void} Responds with a message that user was deleted.
 */
userRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundIndex = users.findIndex(user => user.id === id);
    if (foundIndex === -1) {
        res.status(404).send("User not found");
        return;
    }
    users.splice(foundIndex, 1);
    res.status(200).send("User was deleted!");
});
exports.default = userRouter;
