// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import db from '../dbSetup.js';
import prisma from '../prismaClient.js';
import nodemailer from "nodemailer";

export const registerUser = async (req, res) => {
  try {
    const { name, email, birthdate, sexe, phone, password } = req.body;

    if (!name || !email || !birthdate || !sexe || !phone || !password || !req.file) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const picture = req.file.filename;
    const query = `
      INSERT INTO users (name, email, birthdate, sexe, phone, password, picture)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, email, birthdate, sexe, phone, password, picture];

    await db.run(query, values);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur." });
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires.' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('Erreur SQL:', err.message);
      return res.status(500).json({ success: false, message: 'Erreur du serveur.' });
    }

      if (row) {

      delete row.password;
      row.role = row.email === "dev@gmail.com" ? "developer" : "client";

      return res.status(200).json({ success: true, user: row });
    } 
    else {
      return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect.' });
    }
  });
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthdate, gender, phone } = req.body;
    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: { name, birthdate, gender, phone },
    });
    res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès!", user: updatedUser });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du compte." });
}};

export const sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "L'email est requis." });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.projectshop@gmail.com",
        pass: "qwgfzsuhdvbfksdq",
      },
    });

    const mailOptions = {
      from: "Project Shop <noreply.projectshop@gmail.com>",
      to: email,
      subject: "Code de vérification",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0068d8;">Vérification de votre adresse email</h2>

          <p>Bonjour,</p>

          <p>Vous avez récemment demandé un code de vérification pour finaliser votre inscription sur <strong>Project Shop</strong>.</p>

          <p style="font-size: 18px;">
            🔒 <strong>Votre code de vérification est :</strong>
            <span style="font-size: 24px; color:rgb(5, 163, 0); letter-spacing: 3px;"><strong>${verificationCode}</strong></span>
          </p>

          <p>Veuillez saisir ce code dans la page d'inscription pour confirmer votre adresse email.</p>

          <p>Merci de votre confiance et bienvenue sur <strong>Project Shop</strong> !</p>

          <p style="margin-top: 30px;">Cordialement,</p>
          <p><strong>L'équipe Project Shop</strong></p>
          </div>`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, code: verificationCode });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};