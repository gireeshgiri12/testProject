import { model, Model, Schema, SchemaTypes, Document, Types } from 'mongoose';


export interface IEmployee extends Document {
  name: string;
  phone: number;
  address: string;
  pan: string;
  aadhar: string;
}

export const Employee: Model<IEmployee> = model<IEmployee>(
  'employee',
  new Schema(
    {
      name: { type: String, default:null },
      phone: { type: Number,default:null },
      address: { type: String, default:null },
      pan: { type: String, default:null },
      aadhar: { type: String, default:null },
      
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  )
);

