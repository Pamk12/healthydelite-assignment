import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  googleId?: string; // ✅ Add this
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false }, // ⚡ remove `required: true` so Google users work
  isVerified: { type: Boolean, default: false },
  otp: { type: String, select: false },
  otpExpiry: { type: Date, select: false },
  googleId: { type: String, unique: true, sparse: true }, // ✅ For Google login
}, { timestamps: true });

export default model<IUser>('User', userSchema);
