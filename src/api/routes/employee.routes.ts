import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';

export class EmployeeRoutes {
  static register() {
    const router = Router();
    router.route('/employee/create').post(EmployeeController.createEmployee);
    router.route('/employee/get/:Id').get(EmployeeController.getEmployee);
    router.route('/employee/update/:Id').put(EmployeeController.updateEmployee);
    router.route('/employee/delete/:Id').delete(EmployeeController.deleteEmployee);
    return router;
  }
}
