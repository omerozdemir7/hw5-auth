import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async ({ userId }) => {
  return await ContactsCollection.find({ userId });
};

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const updateContact = async (contactId, userId, payload) => {
  return await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true }
  );
};

export const deleteContact = async (contactId, userId) => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};

export const createContactsBulk = async (contacts) => {
  return await ContactsCollection.insertMany(contacts);
};