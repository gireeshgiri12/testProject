import { model, Model, Schema, SchemaTypes, Document, Types } from 'mongoose';


export interface IEmployeeDetails extends Document {
  date: Date;
  name: string;
  helper_name: string;
  work_description: string;
  work_duration: string;
  day_wages: string;
  wages_per_hour: number;
  payable: number;
  advance: number;
  total_pay: number;
  image: string;
}

export const EmployeeDetails: Model<IEmployeeDetails> = model<IEmployeeDetails>(
  'employeeDetails',
  new Schema(
    {
      name: { type: String, default:null },
      date: { type: Date,default:null },
      helper_name: { type: String, default:null },
      work_description: { type: String, default:null },
      work_duration: { type: String, default:null },
      day_wages: { type: String, default:null },
      wages_per_hour: { type: Number, default:null },
      payable: { type: Number, default:null },
      advance: { type: Number, default:null },
      image: { type: String, default:null },
      total_pay: { type: Number, default:null },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  )
);

