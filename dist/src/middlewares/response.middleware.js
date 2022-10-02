"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestIdResponse = exports.updateResponseStatus = exports.RequestStatus = void 0;
const database_config_1 = require("./../config/database.config");
const logger_config_1 = require("./../config/logger.config");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["processing"] = "PROCESSING";
    RequestStatus["processed"] = "PROCESSED";
})(RequestStatus = exports.RequestStatus || (exports.RequestStatus = {}));
// Todo :- loop back discussion
function updateResponseStatus(_request, response, next) {
    const sendData = response.send;
    const request_id = _request.header("x-requested-with");
    if (request_id) {
        response.send = function (data) {
            // const code = response.status
            // logger.info({ code: response.statusCode });
            updateRequestIdResponse(request_id, data, response.statusCode)
                .then((_) => {
                // logger.info({ message: 'Response Updated Successfully' });
            })
                .catch((error) => logger_config_1.logger.error({ message: "Unable to update response", error }));
            sendData.apply(response, arguments);
        };
    }
    next();
}
exports.updateResponseStatus = updateResponseStatus;
function updateRequestIdResponse(request_id, data, code) {
    return new Promise(async (resolve, reject) => {
        try {
            const expire = parseInt(process.env.RESPONSE_EXPIRE ? process.env.RESPONSE_EXPIRE : "3600");
            const request = await database_config_1.db.get(request_id);
            if (request) {
                const result = JSON.parse(request);
                result.body = data;
                result.code = code;
                result.status = RequestStatus.processed;
                const res = await database_config_1.db.set(request_id, JSON.stringify(result), "ex", expire);
                resolve(res);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.updateRequestIdResponse = updateRequestIdResponse;
//# sourceMappingURL=response.middleware.js.map