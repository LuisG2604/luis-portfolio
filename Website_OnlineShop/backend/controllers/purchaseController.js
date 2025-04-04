// ProjetIntegration UA2 - Project Shop - Luis - Nadir - Jabir

import nodemailer from 'nodemailer';
import prisma from '../prismaClient.js';
import path from 'path';

export const purchaseProject = async (req, res) => {
  try {
    const { project_name, project_description, project_price, user_id, image } = req.body;
    if (!project_name || !project_description || !project_price || !user_id || !image) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    const newOrder = await prisma.orders.create({
      data: {
        project_name,
        project_description,
        project_price: parseFloat(project_price),
        image,
        user_id: parseInt(user_id),
        status: "Purchased",
      },
    });

    res.status(201).json({ success: true, order: newOrder });

  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};
export const sendReceiptEmail = async (req, res) => {
    const { email, title, description, price, total, image, cardLast4 } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: "L'email du destinataire est requis." });
    }
    try {
        const imagePath = path.join(process.cwd(), 'data', 'img', image);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'noreply.projectshop@gmail.com',
                pass: 'qwgfzsuhdvbfksdq'
            }
        });
        const mailOptions = {
            from: `"Project Shop" <noreply.projectshop@gmail.com>`,
            to: email,
            subject: "Votre reçu d'achat",
            html: `
                <h2>Reçu de Commande</h2>
                <p>Merci pour votre achat sur Project Shop ! Voici les détails de votre commande :</p>
                <img src="cid:projectImage" alt="Project Image" style="width:200px; border-radius:8px;">
                <h3>${title}</h3>
                <p>${description}</p>
                <p><strong>Prix du projet :</strong> $${price}</p>
                <p><strong>Frais (5%) :</strong> $${(price * 0.05).toFixed(2)}</p>
                <p><strong>Taxes (15%) :</strong> $${(price * 0.15).toFixed(2)}</p>
                <hr />
                <p><strong>Total payé :</strong> $${total}</p>
                <p><strong>Numéro de carte :</strong> **** **** **** ${cardLast4}</p>
                <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                <p><strong>Merci pour votre confiance !</strong></p>
            `,
            attachments: [
                {
                    filename: image,
                    path: imagePath,
                    cid: 'projectImage'
                }
            ]
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email envoyé avec succès !" });

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        res.status(500).json({ success: false, message: "Erreur serveur. Impossible d'envoyer l'email." });
    }
};