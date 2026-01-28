import { model, Schema } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    // Diğer alanlar...
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true }, // Yeni Alan
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contacts', contactsSchema);