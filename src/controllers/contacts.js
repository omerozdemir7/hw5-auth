import * as contactsService from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const userId = req.user._id; // Authenticate middleware'den gelir
  const contacts = await contactsService.getAllContacts({ userId });
  
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await contactsService.getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const userId = req.user._id;
  const contact = await contactsService.createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await contactsService.updateContact(contactId, userId, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await contactsService.deleteContact(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
// ... (Mevcut kodların altına ekle)

export const createContactsBulkController = async (req, res) => {
  const userId = req.user._id;
  
  // Gelen her kişiye senin ID'ni ekliyoruz
  const contactsData = req.body.map(contact => ({ ...contact, userId }));
  
  const contacts = await contactsService.createContactsBulk(contactsData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contacts!',
    data: contacts,
  });
};