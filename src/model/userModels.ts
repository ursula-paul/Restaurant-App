import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
//import { Type } from '../Utils/interface';


export interface Type extends mongoose.Document {
  email: string;
  password: string;
  fullname: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'A recipe must have a title'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'please provide a valid email!'],
    },

    password: {
      type: String,
      required: [true, 'please provide a valid password!'],
      trim: true,
      min: [8, 'password must be up to 8 or more characters'],
      max: [20, 'password must not exceed 20 characters!'],
      select: false,
    },
    fullname: {
      type: String,
      required: [true, 'please provide fullname!'],
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre<Type>('save', async function (next) {
  const user = this;
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// userSchema.methods.correctPassword = async function (
//   clientPassword: any,
//   userPassword: any
// ) {
//   return await bcrypt.compare(clientPassword, userPassword);
// };

export default mongoose.model<Type>('User', userSchema);
