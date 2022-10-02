"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const exception_handler_1 = require("exception-handler");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_config_1 = require("./config/logger.config");
dotenv_1.default.config({ path: '.env' });
const appInstance = new app_1.App();
appInstance
    .databaseConnection()
    .then(() => {
    const app = appInstance.app;
    // Setting up the port for the server
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.use(exception_handler_1.handleExceptions); // Exception Handling middleware
    // Firing up the server
    app.listen(port, () => {
        logger_config_1.logger.info(`Server is running ❤️ at localhost :${port}`);
    });
})
    .catch((error) => {
    logger_config_1.logger.error(error);
});
//# sourceMappingURL=server.js.map