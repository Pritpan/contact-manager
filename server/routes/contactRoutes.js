import express from 'express';
import {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllContacts);
router.get('/:id', authenticate, getContact);
router.post('/', authenticate, createContact);
router.put('/:id', authenticate, updateContact);
router.delete('/:id', authenticate, deleteContact);

export default router;