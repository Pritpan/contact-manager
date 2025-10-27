import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../controller/contactController.js';

const router = express.Router();

// Route to get all contacts
router.get('/', getAllContacts);

// Route to get a single contact by ID
router.get('/:id', getContactById);

// Route to add a new contact
router.post('/', addContact);

// Route to update an existing contact by ID
router.put('/:id', updateContact);

// Route to delete a contact by ID
router.delete('/:id', deleteContact);

export default router;