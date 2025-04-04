// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import userRoutes from './userRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

export default router;
