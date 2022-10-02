"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
exports.Employee = (0, mongoose_1.model)('employee', new mongoose_1.Schema({
    name: { type: String, default: null },
    phone: { type: Number, default: null },
    address: { type: String, default: null },
    pan: { type: String, default: null },
    aadhar: { type: String, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }));
//# sourceMappingURL=employee.model.js.map