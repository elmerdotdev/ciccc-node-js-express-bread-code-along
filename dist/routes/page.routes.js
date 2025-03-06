"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageRouter = (0, express_1.Router)();
// Home
pageRouter.get("/", (req, res) => {
    res.status(200).send("Welcome to the homepage");
});
// About
pageRouter.get("/about", (req, res) => {
    res.status(200).send("<h1>About Us</h1>");
});
// Admin
pageRouter.get("/admin", (req, res) => {
    res.status(401).send("You are not allowed to access this page!");
});
exports.default = pageRouter;
