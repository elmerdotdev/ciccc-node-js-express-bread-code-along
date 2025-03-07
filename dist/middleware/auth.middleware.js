"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
// Blacklisted IPs
const blacklistIP = ['129.212.43.11', '352.62.72.1', '636.27.14.1'];
/**
 * Middleware to block requests from blacklisted IPs.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 * @returns {void} Blocks request if IP is blacklisted, otherwise continues.
 */
function auth(req, res, next) {
    var _a;
    console.log(`${req.ip} is visiting the server`);
    if (blacklistIP.includes((_a = req.ip) !== null && _a !== void 0 ? _a : '')) {
        res.status(403).send("Be gone hacker!");
        return;
    }
    next(); // Proceed to routes or next middleware
}
