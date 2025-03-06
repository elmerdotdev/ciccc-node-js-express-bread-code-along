"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express
const dotenv_1 = __importDefault(require("dotenv")); // Import dotenv
const auth_middleware_1 = require("./middleware/auth.middleware");
const welcome_middleware_1 = require("./middleware/welcome.middleware");
const page_routes_1 = __importDefault(require("./routes/page.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Allow JSON requests
app.use(auth_middleware_1.auth); // Check IP address
app.use(welcome_middleware_1.welcome); // Show welcome message
// Routes
app.use("/todos", todo_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/", page_routes_1.default);
// Fallback
app.use((req, res, next) => {
    res.status(404).send("Cannot find what you are looking for :(");
});
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
