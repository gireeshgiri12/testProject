"use strict";
/*
 * File: app.ts
 * Project: src
 * File Created: Tuesday, 24th December 2019 12:26:05 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Wednesday, 26th February 2020 5:27:42 pm
 * Modified By: Adithya Sreyaj<adithya@altorumleren.com>
 * -----
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = require("body-parser");
const logger_config_1 = require("./config/logger.config");
const node_aop_1 = require("node-aop");
const language_middleware_1 = require("./middlewares/language.middleware");
const health_controller_1 = require("./api/controllers/health.controller");
const request_middleware_1 = require("./middlewares/request.middleware");
const employee_routes_1 = require("./api/routes/employee.routes");
const employeeDetails_routes_1 = require("./api/routes/employeeDetails.routes");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configureServer();
        logger_config_1.logger.info('creating app instance');
        this.app.route('/payment/api/v1/health').get(health_controller_1.GeneralController.getHealthInfo);
        this.app.use('/emp/api/v1/', employee_routes_1.EmployeeRoutes.register());
        this.app.use('/emp/api/v1/', employeeDetails_routes_1.EmployeeDetailsRoutes.register());
    }
    // Configure the server options
    configureServer() {
        this.app.use((0, compression_1.default)(), (0, helmet_1.default)(), (0, cors_1.default)(), language_middleware_1.languageCheckUp, request_middleware_1.verifyRequestHeader, (0, body_parser_1.json)({ limit: '50mb' }), (0, body_parser_1.urlencoded)({ extended: false }), (0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)('Input Request:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" req-Id: :req[x-requested-with] :status :res[content-length] ":referrer" ":user-agent"', {
            stream: new node_aop_1.LoggerStream(node_aop_1.requestLogger),
            skip: (req, _res) => {
                return req.url.includes('metrics');
            }
        }));
    }
    async databaseConnection() {
        try {
            await (0, mongoose_1.connect)(process.env.MONGODB_URI, {});
            logger_config_1.logger.debug('Database connection successful');
        }
        catch (error) {
            logger_config_1.logger.error(error.message);
            process.exit();
        }
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map