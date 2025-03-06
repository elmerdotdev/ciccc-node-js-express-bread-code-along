"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const userRouter = (0, express_1.Router)();
const users = [
    { id: 'hkjo32ir3ur903', firstname: "John", lastname: "Smith" },
    { id: 'joiflfpofiefwf', firstname: "Jane", lastname: "Doe" }
];
// Get users   http://localhost:3500/users - Browse
userRouter.get('/', (req, res) => {
    res.status(200).json(users);
});
// Get user by id    http://localhost:3500/users/1 - Read
userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send("User not found");
        return;
    }
    res.status(200).json(user);
});
// Add user      http://localhost:3500/users - Add
userRouter.post("/", (req, res) => {
    const newUser = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
// Update user by id      http://localhost:3500/users/1 - Edit
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
// Delete user by id    http://localhost:3500/users/1 - Delete
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
// Search user by firstname     http://localhost:3500/users/search/john
userRouter.get('/search/:firstname', (req, res) => {
    const { firstname } = req.params;
    const foundUsers = users.filter(user => user.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (foundUsers.length === 0) {
        res.status(404).send("No matching users!");
        return;
    }
    res.status(200).json(foundUsers);
});
exports.default = userRouter;
