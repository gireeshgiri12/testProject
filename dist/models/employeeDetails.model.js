"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDetails = void 0;
const mongoose_1 = require("mongoose");
exports.EmployeeDetails = (0, mongoose_1.model)('employeeDetails', new mongoose_1.Schema({
    name: { type: String, default: null },
    date: { type: Date, default: null },
    helper_name: { type: String, default: null },
    work_description: { type: String, default: null },
    work_duration: { type: String, default: null },
    day_wages: { type: String, default: null },
    wages_per_hour: { type: Number, default: null },
    payable: { type: Number, default: null },
    advance: { type: Number, default: null },
    image: { type: String, default: null },
    total_pay: { type: Number, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }));
//# sourceMappingURL=employeeDetails.model.js.map