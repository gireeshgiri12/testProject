"use strict";
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
exports.raxConfig = void 0;
const rax = __importStar(require("retry-axios"));
const logger_config_1 = require("./../config/logger.config");
exports.raxConfig = {
    // Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
    retry: 0,
    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
    noResponseRetries: parseInt(process.env.AXIOS_NUMBER_OF_NO_RESPONSE_RETRY ? process.env.AXIOS_NUMBER_OF_NO_RESPONSE_RETRY : '2', 10),
    // Milliseconds to delay at first.  Defaults to 100.
    retryDelay: parseInt(process.env.AXIOS_RETRY_DELAY ? process.env.AXIOS_RETRY_DELAY : '3000'),
    // HTTP methods to automatically retry.  Defaults to:
    // ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
    httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT', 'POST'],
    // The response status codes to retry.  Supports a double
    // array with a list of ranges.  Defaults to:
    // [[100, 199], [429, 429], [500, 599]]
    statusCodesToRetry: [
        [100, 199],
        [429, 429],
        [500, 599]
    ],
    // You can set the backoff type.
    // options are 'exponential' (default), 'static' or 'linear'
    backoffType: 'exponential',
    // You can detect when a retry is happening, and figure out how many
    // retry attempts have been made
    onRetryAttempt: (err) => {
        const cfg = rax.getConfig(err);
        if (cfg)
            logger_config_1.logger.error({ message: `Retry attempt #${cfg.currentRetryAttempt}`, err });
    }
};
//# sourceMappingURL=rax.config.js.map