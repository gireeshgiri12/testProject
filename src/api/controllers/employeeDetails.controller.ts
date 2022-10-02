import { logger } from '../../config/logger.config';
import { NextFunction, Request, Response } from 'express';
import { badRequest, notFoundError, serverError } from 'exception-handler';
import { EmployeeDetails,IEmployeeDetails} from '../../models/employeeDetails.model';
import * as ExcelJs from "exceljs";

export class EmployeeDetailsController {
  static async createEmployeeDetails(req: Request, response: Response, next: NextFunction) {
    try {
      const data: IEmployeeDetails = req.body;
        const employeeDetails = new EmployeeDetails({ ...data});
        const employeeDetailsResponse = await employeeDetails.save();
        response.json(employeeDetailsResponse);
    } catch (err) {
      console.log({ err });
      response.status(400).json(err);
    }
  }

  static async getEmployeeDetails(req: Request, response: Response, next: NextFunction) {
    try {
      const employee = await EmployeeDetails.findOne({ _id:req.params.Id }).exec();
      if (employee) {
      response.json(employee);
      }
      else{
        response.status(404).json({message:"Details NotFound"});
      }
    } catch (err) {
      const { code, error, message } = JSON.parse(err.message ?? JSON.stringify(serverError()));
      next({ code, error, message });
    }
  }

  static async updateEmployeeDetails(req: Request, response: Response, next: NextFunction) {
    try {
        const employeeResponse = await EmployeeDetails.findByIdAndUpdate(req.params.Id,req.body);
        const emp = await EmployeeDetails.findOne({ _id: req.params.Id }).exec();
        response.json(emp);
    } catch (err) {
      console.log({ err });
      response.status(400).json(err);
    }
  }

  static async deleteEmployeeDetails(req: Request, response: Response, next: NextFunction) {
    try {
      const employee = await EmployeeDetails.findByIdAndDelete(req.params.Id).lean().exec();
      if (employee) {
      response.status(200).json({message:"deletion successful"});
      }
      else {
      response.status(400).json({message:"deletion UnSuccessful"});
      }
    } catch (err) {
      const { code, error, message } = JSON.parse(err.message ?? JSON.stringify(serverError()));
      next({ code, error, message });
    }
  }

  static async exportToExcel(request: Request, response: Response, next: NextFunction) {
    try {
      const results = await EmployeeDetails.find().exec();
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
        (results as any).name = count;
        worksheet.addRow(results);
        count += 1;
      });
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });
      const data = await workbook.xlsx.writeFile("employeeDetails.xlsx");
      response.status(200).json({ message: "employee Details exported successfully" });
    } catch (e) {
      response.status(500).send(e);
    }
  }
}
