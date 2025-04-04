// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import multer from 'multer';
import { publishProject, getAllProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const imgDir = path.join(process.cwd(), 'data', 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const randomNum = Math.floor(Math.random() * 100000);
    const sanitizedTitle = req.body.title.replace(/\s+/g, '_');
    cb(null, `${sanitizedTitle}_project_${randomNum}${fileExtension}`);
  },
});

const upload = multer({ storage });

router.post('/projects', upload.single('image'), publishProject);
router.get('/projects', getAllProjects);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
