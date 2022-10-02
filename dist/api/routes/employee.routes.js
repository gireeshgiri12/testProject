"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
class EmployeeRoutes {
    static register() {
        const router = (0, express_1.Router)();
        router.route('/employee/create').post(employee_controller_1.EmployeeController.createEmployee);
        router.route('/employee/get/:Id').get(employee_controller_1.EmployeeController.getEmployee);
        router.route('/employee/update/:Id').put(employee_controller_1.EmployeeController.updateEmployee);
        router.route('/employee/delete/:Id').delete(employee_controller_1.EmployeeController.deleteEmployee);
        return router;
    }
}
exports.EmployeeRoutes = EmployeeRoutes;
//# sourceMappingURL=employee.routes.js.map