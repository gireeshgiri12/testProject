"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
// import { badRequest, notFoundError, serverError } from 'exception-handler';
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
            response.status(400).json(err);
        }
    }
    static async getEmployee(req, response, next) {
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
            const { code, error, message } = JSON.parse(err.message);
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
            // logger.error(err.message);
            response.status(400).json(err);
        }
    }
    static async deleteEmployee(req, response, next) {
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
            const { code, error, message } = JSON.parse(err.message);
            next({ code, error, message });
        }
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map