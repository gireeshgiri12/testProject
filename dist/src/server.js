"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
// import { logger } from './config/logger.config';
dotenv_1.default.config({ path: '.env' });
const appInstance = new app_1.App();
appInstance
    .databaseConnection()
    .then(() => {
    const app = appInstance.app;
    // Setting up the port for the server
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    // app.use(handleExceptions); // Exception Handling middleware
    // Firing up the server
    app.listen(port, () => {
        console.log(`Server is running ❤️ at localhost :${port}`);
    });
})
    .catch((error) => {
    console.log({ error });
});
//# sourceMappingURL=server.js.map