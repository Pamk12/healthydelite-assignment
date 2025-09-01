import { model, Schema, Document, Types } from 'mongoose';

export interface INote extends Document {
  content: string;
  user: Types.ObjectId;
}

const noteSchema = new Schema<INote>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default model<INote>('Note', noteSchema);