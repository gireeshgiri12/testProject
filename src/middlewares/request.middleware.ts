/*
 * File: request.middleware.ts
 * Project:
 * descriptions: ....
 * File Created: Wednesday, 19th February 2020 2:23:02 pm
 * Author: Mailari hulihond (mailari.hulihond@altorumleren.com)
 * -----
 * Last Modified: Wednesday, 19th February 2020 2:23:02 pm
 * Modified By: Mailari hulihond (mailari.hulihond@altorumleren.com)
 * -----
 * Copyright 2019 - 2020 altorum leren, Altorum leren pvt ltd
 */

import { Request, Response, NextFunction } from 'express';
import { db } from './../config/database.config';
import { logger } from './../config/logger.config';
import { serverError } from 'exception-handler';
import { requestHeader } from './../responses/all-constants.response.json';

export enum RequestStatus {
  processing = 'PROCESSING',
  processed = 'PROCESSED'
}
export interface ResponseData {
  status: RequestStatus;
  body?: any;
  code?: number;
}
export function validateRequest(request: Request, response: Response, _next: NextFunction) {
  const request_id = request.header('x-requested-with');
  // logger.info('checking request parameter ');
  getResponseForRequestId(request_id ? request_id : '')
    .then((data: ResponseData) => {
      if (data.status === RequestStatus.processing) {
        // logger.info('Request is under process');
      } else {
        const body = JSON.parse(data.body);
        if (data.code) {
          response.status(data.code).json(body);
        } else {
          response.json(body);
        }
      }
    })
    .catch((_error) => {
      setFlagForRequestId(request_id ? request_id : '')
        .then((_) => {
          _next();
        })
        .catch((error) => {
          console.log({ error });
          throw error;
        });
    });
}

function getResponseForRequestId(request_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // logger.info(`searching response for request _id : ${request_id} response`);
    db.get(request_id)
      .then((data) => resolve(JSON.parse(data ? data : '')))
      .catch((error) => reject(error));
  });
}

function setFlagForRequestId(request_id: string): Promise<any> {
  // logger.info('setting flag response for request id: ' + request_id);
  return new Promise((resolve, reject) => {
    const newRequest: ResponseData = {
      status: RequestStatus.processing
    };
    const requestData = JSON.stringify(newRequest);
    db.set(request_id, requestData, 'ex', '3000')
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function verifyRequestHeader(request: Request, _response: Response, next: NextFunction) {
  const l = request.headers['content-language'];
  const requestId = request.header('x-requested-with');
  if (requestId) {
    return next();
  }
  next(serverError(l, requestHeader[l].without_header));
}
