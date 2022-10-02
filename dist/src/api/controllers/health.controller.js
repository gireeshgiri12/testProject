"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralController = void 0;
const os_1 = __importDefault(require("os"));
class GeneralController {
    static async getHealthInfo(_req, res, _next) {
        try {
            // comment
            res.json({
                status: 'Server is running',
                version: process.env.npm_package_version,
                hostname: os_1.default.hostname() ? os_1.default.hostname() : 'Not correctly readable hostname',
                name: 'Payment Microservice'
            });
        }
        catch (error) {
            res.status(500).json();
        }
    }
}
exports.GeneralController = GeneralController;
//# sourceMappingURL=health.controller.js.map