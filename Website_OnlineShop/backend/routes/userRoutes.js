// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import express from 'express';
import multer from 'multer';
import { getUserOrders } from "../controllers/orderController.js";
import { registerUser, loginUser , updateUser } from '../controllers/userController.js';
import path from 'path';
import fs from 'fs';
import { sendVerificationEmail } from "../controllers/userController.js";
import { publishProject } from '../controllers/projectController.js';
import prisma from '../prismaClient.js';

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
    const ext = file.originalname.split('.').pop();
    cb(null, `${req.body.name}_picture_${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.post('/projects', upload.single('image'), publishProject);
router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.put('/users/:id', updateUser);
router.post("/send-verification", sendVerificationEmail);
router.get("/orders/user/:userId", getUserOrders);

// Je l'ai fait ici pour ne pas creer un fichier juste pour ca
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
  }
  try {
      const newContact = await prisma.contacts.create({
          data: { name, email, message }
      });
      res.status(201).json({ success: true, message: "Message enregistré avec succès !" });
  } catch (error) {
      console.error("Erreur lors de l'enregistrement du message:", error);
      res.status(500).json({ message: "Erreur serveur." });
  }
});

export default router;
