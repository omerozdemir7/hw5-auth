import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
  createContactsBulkController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
  createContactsBulkSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController)
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.post(
  '/bulk',
  validateBody(createContactsBulkSchema),
  ctrlWrapper(createContactsBulkController)
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController)
);

export default router;