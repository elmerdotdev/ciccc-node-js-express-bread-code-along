"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRouter = (0, express_1.Router)();
// In-memory database
const todos = [
    { id: 1, task: "Wash laundry", isCompleted: false },
    { id: 2, task: "Feed cat", isCompleted: false }
];
// Get todos /todos
todoRouter.get("/", (req, res) => {
    res.status(200).json(todos);
});
exports.default = todoRouter;
