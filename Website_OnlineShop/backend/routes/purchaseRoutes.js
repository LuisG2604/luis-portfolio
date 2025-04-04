// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import { purchaseProject, sendReceiptEmail } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/purchase', purchaseProject);
router.post('/send-receipt', sendReceiptEmail);

export default router;
