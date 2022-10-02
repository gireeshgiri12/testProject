"use strict";
/*
 * File: security.middleware.ts
 * Project:
 * Created: Tuesday, 9th July 2019 6:12:19 pm
 * Author: Mailari (mailari.hulihond@altorumleren.com)
 * Description:
 * -----
 * Last Modified: Monday, 23rd March 2020 6:28:56 pm
 * Modified By: Adithya Sreyaj<adithya@altorumleren.com>
 * -----
 * Copyright - 2019 Altorum leren pvt ltd
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityCheck = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const exception_handler_1 = require("exception-handler");
const logger_config_1 = require("./../config/logger.config");
const all_constants_response_json_1 = require("./../responses/all-constants.response.json");
async function securityCheck(request, _response, next) {
    const l = request.headers["content-language"];
    const header = request.headers.authorization; // Express headers are auto converted to lowercase
    if (header && header.startsWith("Bearer ")) {
        const token = header.slice(7, header.length);
        const secret = process.env.JWT_SECRET;
        try {
            jwt.verify(token, secret);
            next();
        }
        catch (error) {
            logger_config_1.logger.error({ error });
            if (error.name === "TokenExpiredError") {
                return next((0, exception_handler_1.unauthorizedError)(l, all_constants_response_json_1.requestHeader[l].tokenExpired));
            }
            return next((0, exception_handler_1.unauthorizedError)(l));
        }
    }
    else {
        return next((0, exception_handler_1.unauthorizedError)(l, all_constants_response_json_1.requestHeader[l].tokenMissing));
    }
}
exports.securityCheck = securityCheck;
//# sourceMappingURL=security.middleware.js.map