import { logger } from '../../config/logger.config';
import { NextFunction, Request, Response } from 'express';
import { badRequest, notFoundError, serverError } from 'exception-handler';
import {Employee, IEmployee,  } from '../../models/employee.model';

export class EmployeeController {
  static async createEmployee(req: Request, response: Response, next: NextFunction) {
    try {
      const data: IEmployee = req.body;
        const employee = new Employee({ ...data});
        const employeeResponse = await employee.save();
        response.json(employeeResponse);
    } catch (err) {
      console.log({ err });
      response.status(400).json(err);
    }
  }

  static async getEmployee(req: Request, response: Response, next: NextFunction) {
    try {
      const employee = await Employee.findOne({ _id: req.params.Id }).exec();
      if (employee){
        response.json(employee);
      }else
      {
        response.status(404).json({message:"Details NotFound"});
      }
    } catch (err) {
      const { code, error, message } = JSON.parse(err.message ?? JSON.stringify(serverError()));
      next({ code, error, message });
    }
  }

  static async updateEmployee(req: Request, response: Response, next: NextFunction) {
    try {
        const employeeResponse = await Employee.findByIdAndUpdate(req.params.Id,req.body);
        const emp = await Employee.findOne({ _id: req.params.Id }).exec();
        response.json(emp);
    } catch (err) {
      console.log({ err });
      logger.error(err.message);
      response.status(400).json(err);
    }
  }

  static async deleteEmployee(req: Request, response: Response, next: NextFunction) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.Id).lean().exec();
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
}
