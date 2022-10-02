"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRequestHeader = exports.validateRequest = exports.RequestStatus = void 0;
const database_config_1 = require("./../config/database.config");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["processing"] = "PROCESSING";
    RequestStatus["processed"] = "PROCESSED";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
function validateRequest(request, response, _next) {
    const request_id = request.header('x-requested-with');
    // logger.info('checking request parameter ');
    getResponseForRequestId(request_id ? request_id : '')
        .then((data) => {
        if (data.status === RequestStatus.processing) {
            // logger.info('Request is under process');
        }
        else {
            const body = JSON.parse(data.body);
            if (data.code) {
                response.status(data.code).json(body);
            }
            else {
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
exports.validateRequest = validateRequest;
function getResponseForRequestId(request_id) {
    return new Promise((resolve, reject) => {
        // logger.info(`searching response for request _id : ${request_id} response`);
        database_config_1.db.get(request_id)
            .then((data) => resolve(JSON.parse(data ? data : '')))
            .catch((error) => reject(error));
    });
}
function setFlagForRequestId(request_id) {
    // logger.info('setting flag response for request id: ' + request_id);
    return new Promise((resolve, reject) => {
        const newRequest = {
            status: RequestStatus.processing
        };
        const requestData = JSON.stringify(newRequest);
        database_config_1.db.set(request_id, requestData, 'ex', '3000')
            .then((data) => resolve(data))
            .catch((error) => reject(error));
    });
}
function verifyRequestHeader(request, _response, next) {
    const l = request.headers['content-language'];
    const requestId = request.header('x-requested-with');
    if (requestId) {
        return next();
    }
    // next(serverError(l, requestHeader[l].without_header));
}
exports.verifyRequestHeader = verifyRequestHeader;
//# sourceMappingURL=request.middleware.js.map