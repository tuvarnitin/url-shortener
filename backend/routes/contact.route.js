import express from 'express';
import { handleContact } from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/', handleContact);

export default router;