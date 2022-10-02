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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
/*
 * File: database.ts
 * Project:
 * descriptions: ....
 * File Created: Thursday, 30th January 2020 4:58:32 pm
 * Author: Kunal Adhikari (kunal.adhikari@altorumleren.com)
 * -----
 * Last Modified: Thursday, 7th May 2020 9:43:32 am
 * Modified By: Mohammad Asif sk<mohammad.asif@altorumleren.com>
 * -----
 * Copyright 2019 - 2020 altorum leren, Altorum leren pvt ltd
 */
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: '.env' });
exports.db = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    db: parseInt(process.env.REDIS_DB),
    port: parseInt(process.env.REDIS_PORT)
});
//# sourceMappingURL=database.config.js.map