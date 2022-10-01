import { Router } from 'express';
import { EmployeeDetailsController } from '../controllers/employeeDetails.controller';

export class EmployeeDetailsRoutes {
  static register() {
    const router = Router();
    router.route('/employeeDetails/create').post(EmployeeDetailsController.createEmployeeDetails);
    router.route('/employeeDetails/get/:Id').get(EmployeeDetailsController.getEmployeeDetails);
    router.route('/employeeDetails/update/:Id').put(EmployeeDetailsController.updateEmployeeDetails);
    router.route('/employeeDetails/delete/:Id').delete(EmployeeDetailsController.deleteEmployeeDetails);
    router.route('/employeeDetails/exportToExcel').get(EmployeeDetailsController.exportToExcel);
    return router;
  }
}
