"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcome = welcome;
function welcome(req, res, next) {
    console.log("Authentication successful. User is not blocked!");
    next();
}
