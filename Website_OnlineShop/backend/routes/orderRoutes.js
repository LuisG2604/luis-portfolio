// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import { getOrders, acceptOrder, rejectOrder, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders', getOrders);
router.put('/orders/:id/accept', acceptOrder);
router.delete('/orders/:id/reject', rejectOrder);
router.post('/orders', createOrder);

export default router;
