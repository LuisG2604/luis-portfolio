// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes);
app.use('/data/img', express.static(path.join(__dirname, 'data/img')));
app.use('/api', projectRoutes); 
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', contactRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
