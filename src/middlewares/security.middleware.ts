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

import { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError, badRequest } from "exception-handler";
import { logger } from "./../config/logger.config";
import { requestHeader } from "./../responses/all-constants.response.json";

export async function securityCheck(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const l = request.headers["content-language"];
  const header = request.headers.authorization; // Express headers are auto converted to lowercase
  if (header && header.startsWith("Bearer ")) {
    const token = header.slice(7, header.length);
    const secret = process.env.JWT_SECRET;
    try {
      jwt.verify(token, secret);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(unauthorizedError(l, requestHeader[l].tokenExpired));
      }
      return next(unauthorizedError(l));
    }
  } else {
    return next(unauthorizedError(l, requestHeader[l].tokenMissing));
  }
}
