import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
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

// 1. İMPORT KISMINA YENİLERİ EKLE:
import { 
  // ... diğerleri ...
  createContactsBulkController // <-- Bunu ekle
} from '../controllers/contacts.js';

import { 
  // ... diğerleri ...
  createContactsBulkSchema // <-- Bunu ekle
} from '../validation/contacts.js';


// 2. ROTA TANIMLARININ ARASINA ŞUNU EKLE (Post / altına olabilir):

router.post(
  '/bulk',
  validateBody(createContactsBulkSchema),
  ctrlWrapper(createContactsBulkController)
);