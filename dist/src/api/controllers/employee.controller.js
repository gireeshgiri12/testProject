"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const logger_config_1 = require("../../config/logger.config");
const exception_handler_1 = require("exception-handler");
const employee_model_1 = require("../../models/employee.model");
class EmployeeController {
    static async createEmployee(req, response, next) {
        try {
            const data = req.body;
            const employee = new employee_model_1.Employee({ ...data });
            const employeeResponse = await employee.save();
            response.json(employeeResponse);
        }
        catch (err) {
            console.log({ err });
            logger_config_1.logger.error(err.message);
            response.status(400).json(err);
        }
    }
    static async getEmployee(req, response, next) {
        var _a;
        try {
            const employee = await employee_model_1.Employee.findOne({ _id: req.params.Id }).exec();
            if (employee) {
                response.json(employee);
            }
            else {
                response.status(404).json({ message: "Details NotFound" });
            }
        }
        catch (err) {
            const { code, error, message } = JSON.parse((_a = err.message) !== null && _a !== void 0 ? _a : JSON.stringify((0, exception_handler_1.serverError)()));
            next({ code, error, message });
        }
    }
    static async updateEmployee(req, response, next) {
        try {
            const employeeResponse = await employee_model_1.Employee.findByIdAndUpdate(req.params.Id, req.body);
            const emp = await employee_model_1.Employee.findOne({ _id: req.params.Id }).exec();
            response.json(emp);
        }
        catch (err) {
            console.log({ err });
            logger_config_1.logger.error(err.message);
            response.status(400).json(err);
        }
    }
    static async deleteEmployee(req, response, next) {
        var _a;
        try {
            const employee = await employee_model_1.Employee.findByIdAndDelete(req.params.Id).lean().exec();
            if (employee) {
                response.status(200).json({ message: "deletion successful" });
            }
            else {
                response.status(400).json({ message: "deletion UnSuccessful" });
            }
        }
        catch (err) {
            const { code, error, message } = JSON.parse((_a = err.message) !== null && _a !== void 0 ? _a : JSON.stringify((0, exception_handler_1.serverError)()));
            next({ code, error, message });
        }
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map