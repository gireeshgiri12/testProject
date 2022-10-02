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
exports.EmployeeDetailsController = void 0;
const logger_config_1 = require("../../config/logger.config");
const exception_handler_1 = require("exception-handler");
const employeeDetails_model_1 = require("../../models/employeeDetails.model");
const ExcelJs = __importStar(require("exceljs"));
class EmployeeDetailsController {
    static async createEmployeeDetails(req, response, next) {
        try {
            const data = req.body;
            const employeeDetails = new employeeDetails_model_1.EmployeeDetails({ ...data });
            const employeeDetailsResponse = await employeeDetails.save();
            response.json(employeeDetailsResponse);
        }
        catch (err) {
            console.log({ err });
            logger_config_1.logger.error(err.message);
            response.status(400).json(err);
        }
    }
    static async getEmployeeDetails(req, response, next) {
        var _a;
        try {
            const employee = await employeeDetails_model_1.EmployeeDetails.findOne({ _id: req.params.Id }).exec();
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
    static async updateEmployeeDetails(req, response, next) {
        try {
            const employeeResponse = await employeeDetails_model_1.EmployeeDetails.findByIdAndUpdate(req.params.Id, req.body);
            const emp = await employeeDetails_model_1.EmployeeDetails.findOne({ _id: req.params.Id }).exec();
            response.json(emp);
        }
        catch (err) {
            console.log({ err });
            logger_config_1.logger.error(err.message);
            response.status(400).json(err);
        }
    }
    static async deleteEmployeeDetails(req, response, next) {
        var _a;
        try {
            const employee = await employeeDetails_model_1.EmployeeDetails.findByIdAndDelete(req.params.Id).lean().exec();
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
    static async exportToExcel(request, response, next) {
        try {
            const results = await employeeDetails_model_1.EmployeeDetails.find().exec();
            const workbook = new ExcelJs.Workbook();
            const worksheet = workbook.addWorksheet("Employees");
            worksheet.columns = [
                { header: "Name", key: "name", width: 5 },
                { header: "Date", key: "date", width: 20 },
                { header: "HelperName", key: "helper_name", width: 15 },
                { header: "description", key: "work_description", width: 20 },
            ];
            let count = 1;
            results.forEach((results) => {
                results.name = count;
                worksheet.addRow(results);
                count += 1;
            });
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true };
            });
            const data = await workbook.xlsx.writeFile("employeeDetails.xlsx");
            response.status(200).json({ message: "employee Details exported successfully" });
        }
        catch (e) {
            response.status(500).send(e);
        }
    }
}
exports.EmployeeDetailsController = EmployeeDetailsController;
//# sourceMappingURL=employeeDetails.controller.js.map