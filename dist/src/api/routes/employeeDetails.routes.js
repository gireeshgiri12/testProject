"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDetailsRoutes = void 0;
const express_1 = require("express");
const employeeDetails_controller_1 = require("../controllers/employeeDetails.controller");
class EmployeeDetailsRoutes {
    static register() {
        const router = (0, express_1.Router)();
        router.route('/employeeDetails/create').post(employeeDetails_controller_1.EmployeeDetailsController.createEmployeeDetails);
        router.route('/employeeDetails/get/:Id').get(employeeDetails_controller_1.EmployeeDetailsController.getEmployeeDetails);
        router.route('/employeeDetails/update/:Id').put(employeeDetails_controller_1.EmployeeDetailsController.updateEmployeeDetails);
        router.route('/employeeDetails/delete/:Id').delete(employeeDetails_controller_1.EmployeeDetailsController.deleteEmployeeDetails);
        router.route('/employeeDetails/exportToExcel').get(employeeDetails_controller_1.EmployeeDetailsController.exportToExcel);
        return router;
    }
}
exports.EmployeeDetailsRoutes = EmployeeDetailsRoutes;
//# sourceMappingURL=employeeDetails.routes.js.map